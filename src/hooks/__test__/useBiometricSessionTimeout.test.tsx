import { AppStateEvent } from 'react-native';

import { act, renderHook, waitFor } from '@testing-library/react-native';
import { getDefaultStore } from 'jotai';

import { useBiometricSessionTimeout } from '@hooks/useBiometricSessionTimeout';
import { biometricAuthTimestampAtom } from '@store/biometricsStore';
import { mockAppState } from '@utils/mocks/mockAppState';

const store = getDefaultStore();

let mockChangeState: ReturnType<typeof mockAppState>['mockChangeState'];

beforeEach(() => {
    jest.useFakeTimers();
    store.set(biometricAuthTimestampAtom, null);

    const { mockChangeState: _mockChangeState } = mockAppState({ initialState: 'active' });
    mockChangeState = _mockChangeState;
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

    it('pauses timeout when app goes to background', async () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();

        await waitFor(() => mockChangeState(changeType, 'background'));

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();
    });

    it('pauses timeout when app goes inactive', async () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        await waitFor(() => mockChangeState(changeType, 'inactive'));

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();
    });

    it('does not clear session after timeout elapses while app is in background', async () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        await waitFor(() => mockChangeState(changeType, 'background'));

        act(() => {
            jest.advanceTimersByTime(35_000);
        });

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();
    });

    it('resumes timeout when app returns to active', async () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        await waitFor(() => mockChangeState(changeType, 'background'));
        await waitFor(() => mockChangeState(changeType, 'active'));

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();
    });

    it('clears session after remaining time when app resumes from background', async () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        act(() => {
            jest.advanceTimersByTime(20_000);
        });

        await waitFor(() => mockChangeState(changeType, 'background'));
        await waitFor(() => mockChangeState(changeType, 'active'));

        act(() => {
            jest.advanceTimersByTime(9_999);
        });

        expect(store.get(biometricAuthTimestampAtom)).not.toBeNull();

        act(() => {
            jest.advanceTimersByTime(10);
        });

        waitFor(() => expect(store.get(biometricAuthTimestampAtom)).toBeNull());
    });

    it('clears session immediately when already expired on resume', async () => {
        renderHook(() => useBiometricSessionTimeout());

        act(() => {
            store.set(biometricAuthTimestampAtom, Date.now());
        });

        act(() => {
            jest.advanceTimersByTime(5_000);
        });

        await waitFor(() => mockChangeState(changeType, 'background'));

        act(() => {
            jest.advanceTimersByTime(26_000);
        });

        await waitFor(() => mockChangeState(changeType, 'active'));

        waitFor(() => expect(store.get(biometricAuthTimestampAtom)).toBeNull());
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
