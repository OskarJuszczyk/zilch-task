import { authenticateAsync } from 'expo-local-authentication';

import { confirmWithBiometrics } from '@utils/confirmWithBiometrics';

jest.mock('expo-local-authentication', () => ({
    authenticateAsync: jest.fn(),
}));

jest.mock('@utils/logger', () => ({
    log: { error: jest.fn() },
}));

const mockAuthenticateAsync = authenticateAsync as jest.Mock;

describe('confirmWithBiometrics', () => {
    it('calls onSuccess when authentication succeeds', async () => {
        mockAuthenticateAsync.mockResolvedValue({ success: true });
        const onSuccess = jest.fn();

        await confirmWithBiometrics({ onSuccess });

        expect(onSuccess).toHaveBeenCalled();
    });

    it('calls onUserCancel on user_cancel error', async () => {
        mockAuthenticateAsync.mockResolvedValue({ success: false, error: 'user_cancel' });
        const onUserCancel = jest.fn();
        const onAuthError = jest.fn();

        await confirmWithBiometrics({ onUserCancel, onAuthError });

        expect(onUserCancel).toHaveBeenCalled();
        expect(onAuthError).not.toHaveBeenCalled();
    });

    it('calls onAuthError for non-cancel auth failures', async () => {
        const authResult = { success: false, error: 'lockout' };
        mockAuthenticateAsync.mockResolvedValue(authResult);
        const onAuthError = jest.fn();

        await confirmWithBiometrics({ onAuthError });

        expect(onAuthError).toHaveBeenCalledWith(authResult);
    });

    it('does not throw when no callbacks provided and auth succeeds', async () => {
        mockAuthenticateAsync.mockResolvedValue({ success: true });

        await expect(confirmWithBiometrics({})).resolves.toBeUndefined();
    });

    it('does not throw when no callbacks provided and auth fails', async () => {
        mockAuthenticateAsync.mockResolvedValue({ success: false, error: 'lockout' });

        await expect(confirmWithBiometrics({})).resolves.toBeUndefined();
    });

    it('logs error when authenticateAsync throws', async () => {
        const { log } = require('@utils/logger');
        const error = new Error('native crash');
        mockAuthenticateAsync.mockRejectedValue(error);

        await confirmWithBiometrics({ onSuccess: jest.fn() });

        expect(log.error).toHaveBeenCalledWith(error);
    });
});
