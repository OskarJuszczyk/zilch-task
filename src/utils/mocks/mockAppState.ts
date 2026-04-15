import { AppState, AppStateEvent, AppStateStatus } from 'react-native';

type Props = {
    initialState?: AppStateStatus;
};

export function mockAppState({ initialState = 'active' }: Props) {
    const _appStateSubscriptions = new Map<AppStateEvent, (state: AppStateStatus) => void>();
    let state = initialState;

    Object.defineProperty(AppState, 'currentState', {
        get: () => initialState,
    });

    jest.spyOn(AppState, 'addEventListener').mockImplementation((type: AppStateEvent, listener: (state: AppStateStatus) => void) => {
        _appStateSubscriptions.set(type, listener);
        return {
            remove: () => _appStateSubscriptions.delete(type),
        };
    });

    const mockChangeState = jest.fn((type: AppStateEvent, nextState: AppStateStatus) => {
        state = nextState;
        const handler = _appStateSubscriptions.get(type);
        if (handler) {
            handler(nextState);
        }
    });

    return { state, mockChangeState };
}
