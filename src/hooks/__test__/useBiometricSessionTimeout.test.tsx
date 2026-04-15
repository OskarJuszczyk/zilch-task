import { AppStateEvent } from 'react-native';

import { renderHook, act, waitFor } from '@testing-library/react-native';
import { getDefaultStore } from 'jotai';

import { useBiometricSessionTimeout } from '@hooks/useBiometricSessionTimeout';
import * as globalStoreModule from '@store/globalStore';
import { biometricAuthTimestampAtom } from '@store/globalStore';
import { mockAppState } from '@utils/mocks/mockAppState';

const store = getDefaultStore();

let mockChangeState: ReturnType<typeof mockAppState>['mockChangeState'];

beforeEach(() => {
    jest.useFakeTimers();
    jest.replaceProperty(globalStoreModule, 'globalJotaiStore', store);
    store.set(biometricAuthTimestampAtom, null);

    ({ mockChangeState } = mockAppState({ initialState: 'active' }));
});

afterEach(() => {
    jest.useRealTimers();
});

const changeType: AppStateEvent = 'change';

describe('useBiometricSessionTimeout', () => {
    it('clears session after timeout expires', () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();

        act(() => {
            jest.advanceTimersByTime(30_000);
        });

        expect(store.get(biometricAuthTimestampAtom)).toBeNull();
    });

    it('does not clear session before timeout', () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        act(() => {
            jest.advanceTimersByTime(29_999);
        });

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();
    });

    it('clears session immediately if timestamp is already expired', () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now() - 31_000);
        });

        expect(store.get(biometricAuthTimestampAtom)).toBeNull();
    });

    it('clears session when app goes to background', async () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();

        await waitFor(() => mockChangeState(changeType, 'background'));

        expect(store.get(biometricAuthTimestampAtom)).toBeNull();
    });

    it('clears session when app goes inactive', async () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        await waitFor(() => mockChangeState(changeType, 'inactive'));

        expect(store.get(biometricAuthTimestampAtom)).toBeNull();
    });

    it('does not clear session when app comes to foreground', async () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        await waitFor(() => mockChangeState(changeType, 'active'));

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();
    });

    it('resets timeout when timestamp changes', () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        act(() => {
            jest.advanceTimersByTime(20_000);
        });

        // Re-auth resets the timer
        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        act(() => {
            jest.advanceTimersByTime(20_000);
        });

        // Should still be active — only 20s since re-auth
        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();

        act(() => {
            jest.advanceTimersByTime(10_000);
        });

        expect(store.get(biometricAuthTimestampAtom)).toBeNull();
    });
});
