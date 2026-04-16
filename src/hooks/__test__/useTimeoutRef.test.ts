import { renderHook, act } from '@testing-library/react-native';

import { useTimeoutRef } from '@hooks/useTimeoutRef';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

describe('useTimeoutRef', () => {
    it('returns ref with initial null value', () => {
        const { result } = renderHook(() => useTimeoutRef());

        expect(result.current.current).toBeNull();
    });

    it('clears timeout on unmount when ref holds a timeout ID', () => {
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

        const { result, unmount } = renderHook(() => useTimeoutRef());

        act(() => {
            result.current.current = setTimeout(() => {}, 5000);
        });

        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });

    it('does not throw on unmount when ref is null', () => {
        const { unmount } = renderHook(() => useTimeoutRef());

        expect(() => unmount()).not.toThrow();
    });
});
