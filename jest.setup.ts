/// <reference types="expo-router/types/expect" />

import { Dimensions } from 'react-native';

import { setUpTests } from 'react-native-reanimated';

import * as matchers from 'jest-extended';
import mockRNSafeArea from 'react-native-safe-area-context/jest/mock';

// Official library setups
setUpTests();

expect.extend(matchers);

jest.mock('react-native-safe-area-context', () => mockRNSafeArea);
jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));

// Mock react-native-mmkv
const mockMmkvStore = new Map<string, string>();
const mockMmkvListeners = new Set<(k: string) => void>();

jest.mock('react-native-mmkv', () => ({
    createMMKV: () => ({
        getString: (k: string) => mockMmkvStore.get(k) ?? undefined,
        set: (k: string, v: string) => {
            mockMmkvStore.set(k, v);
            mockMmkvListeners.forEach(cb => cb(k));
        },
        remove: (k: string) => {
            mockMmkvStore.delete(k);
            mockMmkvListeners.forEach(cb => cb(k));
        },
        addOnValueChangedListener: (cb: (k: string) => void) => {
            mockMmkvListeners.add(cb);
            return { remove: () => mockMmkvListeners.delete(cb) };
        },
        clearAll: () => mockMmkvStore.clear(),
    }),
}));

// Mock expo modules
jest.mock('expo-haptics', () => ({
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
    selectionAsync: jest.fn(),
    ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
    NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
}));

jest.mock('expo-splash-screen', () => ({
    setOptions: jest.fn(),
    preventAutoHideAsync: jest.fn(),
    hideAsync: jest.fn(),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('expo-linking');

jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 375, height: 700, fontScale: 1, scale: 1 });

// Reset state per test — prevents atom state leaking
beforeEach(() => {
    jest.clearAllMocks();

    mockMmkvStore.clear();
    mockMmkvListeners.clear();

    jest.mock('jotai', () => {
        const jotai = jest.requireActual('jotai/index');

        return {
            ...jotai,
            getDefaultStore: jest.fn().mockReturnValue(jotai.createStore()),
        };
    });
});

afterAll(() => {
    jest.clearAllTimers();
});
