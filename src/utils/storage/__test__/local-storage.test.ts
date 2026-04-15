import * as localStorage from '@utils/storage/localStorage';
import { createMMKV } from 'react-native-mmkv';

const KEY = 'key';
const VALUE = 'value';

const KEY1 = 'key1';
const VALUE1 = 'value1';

const ID = 'JEST_NAME' as localStorage.LocalStorageKey;

describe('localStorage', () => {
    it('will work correctly', () => {
        jest.replaceProperty(localStorage, 'APP_LOCAL_STORAGE', createMMKV({ id: ID }));

        localStorage.setLocalStorageItem(KEY, VALUE);
        expect(localStorage.getLocalStorageItem(KEY)).toBe(VALUE);

        localStorage.setLocalStorageItem(KEY, null);
        expect(localStorage.getLocalStorageItem(KEY)).toBe(null);

        localStorage.setLocalStorageItem(KEY, VALUE);
        expect(localStorage.getLocalStorageItem(KEY)).toBe(VALUE);

        localStorage.removeLocalStorageItem(KEY);
        expect(localStorage.getLocalStorageItem(KEY)).toBe(null);

        localStorage.setLocalStorageItem(KEY, VALUE);
        localStorage.setLocalStorageItem(KEY1, VALUE1);

        expect(localStorage.getLocalStorageItem(KEY)).toBe(VALUE);
        expect(localStorage.getLocalStorageItem(KEY1)).toBe(VALUE1);

        localStorage.clearAllLocalStorageItems();

        expect(localStorage.getLocalStorageItem(KEY)).toBe(null);
        expect(localStorage.getLocalStorageItem(KEY1)).toBe(null);
    });
});
