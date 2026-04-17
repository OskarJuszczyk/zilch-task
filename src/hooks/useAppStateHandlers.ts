import { useEffect, useRef } from 'react';

import { AppState, AppStateStatus } from 'react-native';

import { log } from '@utils/logger';

type UseAppStateHandlersProps = {
    handleAppStateChange: (nextAppState: AppStateStatus, currentAppState: AppStateStatus) => void;
    initialState?: AppStateStatus;
};

export function useAppStateHandlers({ handleAppStateChange, initialState = AppState.currentState }: UseAppStateHandlersProps) {
    const currentAppState = useRef<AppStateStatus>(initialState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            log.debug(`App state change: ${currentAppState.current} -> ${nextAppState}`);
            handleAppStateChange(nextAppState, currentAppState.current);
            currentAppState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, [handleAppStateChange]);
}
