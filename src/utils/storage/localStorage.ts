import { createMMKV } from 'react-native-mmkv';

import { isDefinedNonNull } from '@utils/isDefinedNonNull';

export const APP_LOCAL_STORAGE = createMMKV();

export function getLocalStorageItem<T>(key: string): T | null {
    const value = APP_LOCAL_STORAGE.getString(key);
    try {
        const finalValue = isDefinedNonNull(value) ? JSON.parse(value) : null;
        return finalValue;
    } catch {
        return null;
    }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
    if (isDefinedNonNull(value)) {
        APP_LOCAL_STORAGE.set(key, JSON.stringify(value));
    } else {
        removeLocalStorageItem(key);
    }
}

export function removeLocalStorageItem(key: string): void {
    APP_LOCAL_STORAGE.remove(key);
}

export function clearAllLocalStorageItems(): void {
    APP_LOCAL_STORAGE.clearAll();
}

export const LOCAL_STORAGE_KEYS = {
    DEVICE_BIOMETRICS: 'DEVICE_BIOMETRICS',
    USER_CARDS: 'USER_CARDS',
} as const;

export type LocalStorageKey = keyof typeof LOCAL_STORAGE_KEYS;

export const isLocalStorageKey = (key: string): key is LocalStorageKey => {
    return Object.values(LOCAL_STORAGE_KEYS).includes(key as LocalStorageKey);
};
