import { store } from 'expo-router/build/global-state/router-store';

import { getCurrentPath } from '@utils/navigation/getCurrentPath';

jest.mock('expo-router/build/global-state/router-store', () => ({
    store: {
        getRouteInfo: jest.fn(),
    },
}));

const mockGetRouteInfo = store.getRouteInfo as jest.Mock;

describe('getCurrentPath', () => {
    it('returns pathname from route info', () => {
        mockGetRouteInfo.mockReturnValue({ pathname: '/home' });

        expect(getCurrentPath()).toBe('/home');
    });

    it('returns undefined when route info is undefined', () => {
        mockGetRouteInfo.mockReturnValue(undefined);

        expect(getCurrentPath()).toBeUndefined();
    });

    it('returns undefined when pathname is missing', () => {
        mockGetRouteInfo.mockReturnValue({});

        expect(getCurrentPath()).toBeUndefined();
    });
});
