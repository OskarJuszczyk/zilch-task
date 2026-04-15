import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { APP_LOCAL_STORAGE } from '@utils/storage/localStorage';

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
    atomWithStorage<T>(
        key,
        initialValue,
        createJSONStorage<T>(() => ({
            getItem: k => APP_LOCAL_STORAGE.getString(k) ?? null,
            setItem: (k, v) => APP_LOCAL_STORAGE.set(k, v),
            removeItem: k => APP_LOCAL_STORAGE.remove(k),
            subscribe: (k, cb) => {
                const { remove } = APP_LOCAL_STORAGE.addOnValueChangedListener(changed => {
                    if (changed === k) {
                        cb(APP_LOCAL_STORAGE.getString(k) ?? null);
                    }
                });
                return remove;
            },
        })),
        { getOnInit: true },
    );
