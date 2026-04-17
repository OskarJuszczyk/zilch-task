import { useCallback } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { biometricAuthTimestampAtom } from '@store/biometricsStore';
import { confirmWithBiometrics } from '@utils/confirmWithBiometrics';

type UseUnlockWithBiometricsParams = {
    onSuccess: () => void;
    onUserCancel?: () => void;
};

export function useUnlockWithBiometrics({ onSuccess, onUserCancel }: UseUnlockWithBiometricsParams) {
    const biometricsAuthTimestamp = useAtomValue(biometricAuthTimestampAtom);
    const setTimestamp = useSetAtom(biometricAuthTimestampAtom);

    const isBiometricsSessionActive = biometricsAuthTimestamp !== null;

    const unlock = useCallback(() => {
        if (isBiometricsSessionActive) {
            onSuccess();
            return;
        }

        confirmWithBiometrics({
            onSuccess: () => {
                setTimestamp(Date.now());
                onSuccess();
            },
            onUserCancel,
        });
    }, [isBiometricsSessionActive, setTimestamp, onSuccess, onUserCancel]);

    return { isBiometricsSessionActive, unlock };
}
