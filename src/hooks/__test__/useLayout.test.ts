import { LayoutChangeEvent } from 'react-native';

import { renderHook, act } from '@testing-library/react-native';

import { useLayout } from '@hooks/useLayout';

function createLayoutEvent(layout: { x: number; y: number; width: number; height: number }): LayoutChangeEvent {
    return { nativeEvent: { layout } } as LayoutChangeEvent;
}

describe('useLayout', () => {
    it('starts with zero layout and isLayoutMeasured false', () => {
        const { result } = renderHook(() => useLayout());

        expect(result.current.isLayoutMeasured).toBeFalse();
        expect(result.current.layout).toEqual({ x: 0, y: 0, width: 0, height: 0 });
    });

    it('updates layout and sets isLayoutMeasured after onLayout', () => {
        const { result } = renderHook(() => useLayout());

        act(() => {
            result.current.onLayout(createLayoutEvent({ x: 10, y: 20, width: 300, height: 400 }));
        });

        expect(result.current.isLayoutMeasured).toBeTrue();
        expect(result.current.layout).toEqual({ x: 10, y: 20, width: 300, height: 400 });
    });

    it('updates layout on subsequent onLayout calls', () => {
        const { result } = renderHook(() => useLayout());

        act(() => {
            result.current.onLayout(createLayoutEvent({ x: 0, y: 0, width: 100, height: 50 }));
        });

        act(() => {
            result.current.onLayout(createLayoutEvent({ x: 5, y: 10, width: 200, height: 100 }));
        });

        expect(result.current.layout).toEqual({ x: 5, y: 10, width: 200, height: 100 });
    });
});
