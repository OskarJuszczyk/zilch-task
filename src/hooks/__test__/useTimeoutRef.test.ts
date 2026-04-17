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

        expect(result.current.ref.current).toBeNull();
    });

    it('clears timeout on unmount when ref holds a timeout ID', () => {
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

        const { result, unmount } = renderHook(() => useTimeoutRef());

        act(() => {
            result.current.ref.current = setTimeout(() => {}, 5000);
        });

        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });

    it('does not throw on unmount when ref is null', () => {
        const { unmount } = renderHook(() => useTimeoutRef());

        expect(() => unmount()).not.toThrow();
    });

    it('cleanRef clears timeout and nulls ref', () => {
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

        const { result } = renderHook(() => useTimeoutRef());

        act(() => {
            result.current.ref.current = setTimeout(() => {}, 5000);
        });

        act(() => {
            result.current.cleanRef();
        });

        expect(clearTimeoutSpy).toHaveBeenCalled();
        expect(result.current.ref.current).toBeNull();
        clearTimeoutSpy.mockRestore();
    });

    it('cleanRef does nothing when ref is null', () => {
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

        const { result } = renderHook(() => useTimeoutRef());

        act(() => {
            result.current.cleanRef();
        });

        expect(clearTimeoutSpy).not.toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });
});
