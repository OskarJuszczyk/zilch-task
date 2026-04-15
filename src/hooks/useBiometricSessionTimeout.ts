import { useCallback, useEffect } from 'react';

import { AppStateStatus } from 'react-native';

import { useAtomValue } from 'jotai';

import { useAppStateHandlers } from '@hooks/useAppStateHandlers';
import { useTimeoutRef } from '@hooks/useTimeoutRef';
import { biometricAuthTimestampAtom, globalJotaiStore } from '@store/globalStore';
import { log } from '@utils/logger';

const BIOMETRIC_SESSION_TIMEOUT = 30_000;

export function useBiometricSessionTimeout() {
    const timestamp = useAtomValue(biometricAuthTimestampAtom);
    const timeoutRef = useTimeoutRef();

    const clearSession = useCallback(
        (reason: string) => {
            log.debug(`Biometric session cleared: ${reason}`);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            globalJotaiStore.set(biometricAuthTimestampAtom, null);
        },
        [timeoutRef],
    );

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (timestamp == null) {
            return;
        }

        const elapsed = Date.now() - timestamp;
        const remaining = BIOMETRIC_SESSION_TIMEOUT - elapsed;

        if (remaining <= 0) {
            clearSession('expired');
            return;
        }

        timeoutRef.current = setTimeout(() => clearSession('timeout'), remaining);
    }, [timestamp, timeoutRef, clearSession]);

    const handleAppStateChange = useCallback(
        (nextAppState: AppStateStatus, currentAppState: AppStateStatus) => {
            if (currentAppState !== nextAppState && (nextAppState === 'background' || nextAppState === 'inactive')) {
                clearSession('app backgrounded');
            }
        },
        [clearSession],
    );

    useAppStateHandlers({ handleAppStateChange });
}
