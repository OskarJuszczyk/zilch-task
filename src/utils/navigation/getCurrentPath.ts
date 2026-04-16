import { store } from 'expo-router/build/global-state/router-store';

export const getCurrentPath = () => {
    const path = store.getRouteInfo()?.pathname;
    return path;
};
