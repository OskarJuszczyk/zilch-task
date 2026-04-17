import { useCallback, useEffect } from 'react';

import { AppStateStatus } from 'react-native';

import { useAtomValue, useSetAtom } from 'jotai';

import { useAppStateHandlers } from '@hooks/useAppStateHandlers';
import { useTimeoutRef } from '@hooks/useTimeoutRef';
import { biometricAuthTimestampAtom } from '@store/biometricsStore';
import { globalJotaiStore } from '@store/globalStore';
import { log } from '@utils/logger';

const BIOMETRIC_SESSION_TIMEOUT = 30_000;

export function useBiometricSessionTimeout() {
    const timestamp = useAtomValue(biometricAuthTimestampAtom);
    const setTimestamp = useSetAtom(biometricAuthTimestampAtom);

    const { ref: timeoutRef, cleanRef: clearBiometricTimeout } = useTimeoutRef();

    const clearBiometricsSession = useCallback(
        (reason: string) => {
            log.debug(`Biometric session cleared: ${reason}`);
            clearBiometricTimeout();
            setTimestamp(null);
        },
        [clearBiometricTimeout, setTimestamp],
    );

    const startBiometricsSessionTimeout = useCallback(
        async (timestamp: number | null) => {
            clearBiometricTimeout();

            if (!timestamp) {
                return;
            }

            const elapsed = Date.now() - timestamp;
            const remaining = BIOMETRIC_SESSION_TIMEOUT - elapsed;

            if (remaining <= 0) {
                clearBiometricsSession('expired');
                return;
            }

            timeoutRef.current = setTimeout(() => clearBiometricsSession('timeout'), remaining);
        },
        [clearBiometricTimeout, timeoutRef, clearBiometricsSession],
    );

    useEffect(() => {
        if (!timestamp) {
            return;
        }

        startBiometricsSessionTimeout(timestamp);
    }, [timestamp, startBiometricsSessionTimeout]);

    const handleAppStateChange = useCallback(
        (nextAppState: AppStateStatus, currentAppState: AppStateStatus) => {
            if (currentAppState !== nextAppState && nextAppState !== 'active') {
                clearBiometricTimeout();
            }

            if (currentAppState !== nextAppState && nextAppState === 'active') {
                startBiometricsSessionTimeout(globalJotaiStore.get(biometricAuthTimestampAtom));
            }
        },
        [clearBiometricTimeout, startBiometricsSessionTimeout],
    );

    useAppStateHandlers({ handleAppStateChange });
}
