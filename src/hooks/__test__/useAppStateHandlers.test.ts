import { AppStateEvent, AppStateStatus, Platform } from 'react-native';

import { renderHook, waitFor } from '@testing-library/react-native';

import { useAppStateHandlers } from '@hooks/useAppStateHandlers';
import { mockAppState } from '@utils/mocks/mockAppState';

describe('useAppStateHandlers', () => {
    it('calls handleAppStateChange with correct states on ios', async () => {
        const initialState = 'active';
        const { mockChangeState } = mockAppState({ initialState });
        const handleAppStateChange = jest.fn();
        jest.replaceProperty(Platform, 'OS', 'ios');

        renderHook(() => useAppStateHandlers({ handleAppStateChange, initialState }));

        const type: AppStateEvent = 'change';

        const nextState: AppStateStatus = 'background';
        await waitFor(() => mockChangeState(type, nextState));

        expect(handleAppStateChange).toHaveBeenCalledTimes(1);
        expect(handleAppStateChange).toHaveBeenCalledWith(nextState, initialState);

        const nextState2 = 'active';
        await waitFor(() => mockChangeState(type, nextState2));

        expect(handleAppStateChange).toHaveBeenCalledTimes(2);
        expect(handleAppStateChange).toHaveBeenCalledWith(nextState2, nextState);

        const nextState3 = 'background';
        await waitFor(() => mockChangeState(type, nextState3));

        expect(handleAppStateChange).toHaveBeenCalledTimes(3);
        expect(handleAppStateChange).toHaveBeenCalledWith(nextState3, nextState2);
    });

    it('calls handleAppStateChange with correct states on android', async () => {
        const initialState = 'active';
        const { mockChangeState } = mockAppState({});
        const handleAppStateChange = jest.fn();
        jest.replaceProperty(Platform, 'OS', 'android');

        renderHook(() => useAppStateHandlers({ handleAppStateChange, initialState }));

        const type: AppStateEvent = 'change';

        const nextState: AppStateStatus = 'background';
        await waitFor(() => mockChangeState(type, nextState));

        expect(handleAppStateChange).toHaveBeenCalledTimes(1);
        expect(handleAppStateChange).toHaveBeenCalledWith(nextState, initialState);

        const nextState2 = 'active';
        await waitFor(() => mockChangeState(type, nextState2));

        expect(handleAppStateChange).toHaveBeenCalledTimes(2);
        expect(handleAppStateChange).toHaveBeenCalledWith(nextState2, nextState);
    });

    it('cleans up subscription on unmount', async () => {
        const { mockChangeState } = mockAppState({ initialState: 'active' });
        const handleAppStateChange = jest.fn();

        const { unmount } = renderHook(() => useAppStateHandlers({ handleAppStateChange, initialState: 'active' }));

        unmount();

        await waitFor(() => mockChangeState('change', 'background'));

        expect(handleAppStateChange).not.toHaveBeenCalled();
    });
});
