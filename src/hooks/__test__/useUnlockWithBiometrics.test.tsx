import { renderHook, act } from '@testing-library/react-native';
import { getDefaultStore } from 'jotai';

import { useUnlockWithBiometrics } from '@hooks/useUnlockWithBiometrics';
import * as globalStoreModule from '@store/globalStore';
import { biometricAuthTimestampAtom } from '@store/globalStore';
import { confirmWithBiometrics } from '@utils/confirmWithBiometrics';

jest.mock('@utils/confirmWithBiometrics', () => ({
    confirmWithBiometrics: jest.fn(),
}));

const mockConfirmWithBiometrics = confirmWithBiometrics as jest.MockedFunction<typeof confirmWithBiometrics>;

const store = getDefaultStore();

beforeEach(() => {
    jest.replaceProperty(globalStoreModule, 'globalJotaiStore', store);
    store.set(biometricAuthTimestampAtom, null);
});

describe('useUnlockWithBiometrics', () => {
    it('calls confirmWithBiometrics when session is not active', () => {
        const onSuccess = jest.fn();
        mockConfirmWithBiometrics.mockImplementation(() => Promise.resolve());

        const { result } = renderHook(() => useUnlockWithBiometrics({ onSuccess }));

        act(() => {
            result.current.unlock();
        });

        expect(mockConfirmWithBiometrics).toHaveBeenCalledTimes(1);
        expect(onSuccess).not.toHaveBeenCalled();
    });

    it('calls onSuccess directly when session is active', () => {
        const onSuccess = jest.fn();

        store.set(biometricAuthTimestampAtom, Date.now());

        const { result } = renderHook(() => useUnlockWithBiometrics({ onSuccess }));

        act(() => {
            result.current.unlock();
        });

        expect(mockConfirmWithBiometrics).not.toHaveBeenCalled();
        expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it('sets timestamp and calls onSuccess on biometric success', () => {
        const onSuccess = jest.fn();

        mockConfirmWithBiometrics.mockImplementation(({ onSuccess: biometricOnSuccess }) => {
            biometricOnSuccess?.();
            return Promise.resolve();
        });

        const { result } = renderHook(() => useUnlockWithBiometrics({ onSuccess }));

        act(() => {
            result.current.unlock();
        });

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();
        expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it('calls onUserCancel when biometric is cancelled', () => {
        const onSuccess = jest.fn();
        const onUserCancel = jest.fn();

        mockConfirmWithBiometrics.mockImplementation(({ onUserCancel: biometricOnCancel }) => {
            biometricOnCancel?.();
            return Promise.resolve();
        });

        const { result } = renderHook(() => useUnlockWithBiometrics({ onSuccess, onUserCancel }));

        act(() => {
            result.current.unlock();
        });

        expect(onUserCancel).toHaveBeenCalledTimes(1);
        expect(onSuccess).not.toHaveBeenCalled();
        expect(store.get(biometricAuthTimestampAtom)).toBeNull();
    });

    it('reports isBiometricsSessionActive based on timestamp', () => {
        const onSuccess = jest.fn();

        const { result, rerender } = renderHook(() => useUnlockWithBiometrics({ onSuccess }));

        expect(result.current.isBiometricsSessionActive).toBeFalsy();

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        rerender({});

        expect(result.current.isBiometricsSessionActive).toBeTruthy();
    });
});
