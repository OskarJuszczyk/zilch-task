import { authenticateAsync } from 'expo-local-authentication';

import i18next from 'i18next';

import { log } from '@utils/logger';

export type OnConfirmWithBiometricsErrorParams = { success: false; error: string; warning?: string };

export async function confirmWithBiometrics({
    onSuccess,
    onAuthError,
    onUserCancel,
}: {
    onSuccess?: VoidFunction;
    onAuthError?: (params: OnConfirmWithBiometricsErrorParams) => void;
    onUserCancel?: VoidFunction;
}) {
    try {
        const result = await authenticateAsync({
            disableDeviceFallback: true,
            promptMessage: i18next.t('biometrics.confirm'),
            cancelLabel: i18next.t('biometrics.cancel'),
            requireConfirmation: false,
            biometricsSecurityLevel: 'strong',
            fallbackLabel: '',
        });

        if (result.success) {
            onSuccess?.();
            return;
        }

        if (result.error === 'user_cancel') {
            onUserCancel?.();
            return;
        }

        if (onAuthError) {
            onAuthError(result);
        }
    } catch (error) {
        log.error(error);
    }
}
