import { renderHook, waitFor } from '@testing-library/react-native';
import { atomWithMMKV } from '@utils/storage/atomWithMmkv';
import * as localStorage from '@utils/storage/localStorage';
import { LocalStorageKey } from '@utils/storage/localStorage';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';

const JEST_KEY = 'JEST_KEY' as LocalStorageKey;

const value = atomWithMMKV<boolean | null>(JEST_KEY, null);

describe('atomWithMMKVStorage', () => {
    it('will check the methods', async () => {
        const { result, rerender } = renderHook(() => useAtom(value));

        expect(result.current[0]).toBe(null);

        await waitFor(() => result.current[1](true));

        expect(localStorage.getLocalStorageItem(JEST_KEY)).toBeTrue();

        rerender('');
        expect(result.current[0]).toBeTrue();

        await waitFor(() => result.current[1](RESET));
        expect(localStorage.getLocalStorageItem(JEST_KEY)).toBe(null);

        rerender('');
        expect(result.current[0]).toBe(null);
    });
});
