import { cancelAnimation, withTiming } from 'react-native-reanimated';
import { renderHook } from '@testing-library/react-native';

import { useDisabledOpacity } from '@hooks/animation/useDisabledOpacity';

jest.mock('react-native-reanimated', () => {
    const actual = jest.requireActual('react-native-reanimated/mock');
    return {
        ...actual,
        cancelAnimation: jest.fn(),
        withTiming: jest.fn((toValue: number) => toValue),
        useSharedValue: (initial: number) => ({ value: initial }),
        useAnimatedStyle: (fn: () => object) => fn(),
        useAnimatedReaction: (prepare: () => boolean, react: (val: boolean) => void) => {
            // Immediately invoke to simulate reaction
            react(prepare());
        },
    };
});

const mockCancelAnimation = cancelAnimation as jest.MockedFunction<typeof cancelAnimation>;
const mockWithTiming = withTiming as jest.MockedFunction<typeof withTiming>;

beforeEach(() => {
    mockCancelAnimation.mockClear();
    mockWithTiming.mockClear();
});

describe('useDisabledOpacity', () => {
    it('returns animatedStyle', () => {
        const { result } = renderHook(() => useDisabledOpacity(false));

        expect(result.current.animatedStyle).toBeDefined();
    });

    it('animates to disabled opacity when disabled is true', () => {
        renderHook(() => useDisabledOpacity(true));

        expect(mockWithTiming).toHaveBeenCalledWith(0.6, { duration: 150 });
    });

    it('animates to full opacity when disabled is false', () => {
        renderHook(() => useDisabledOpacity(false));

        expect(mockWithTiming).toHaveBeenCalledWith(1, { duration: 150 });
    });

    it('cancels previous animation before starting new one', () => {
        renderHook(() => useDisabledOpacity(true));

        expect(mockCancelAnimation).toHaveBeenCalled();
    });

    it('re-animates when disabled prop changes', () => {
        const { rerender } = renderHook(({ disabled }: { disabled: boolean }) => useDisabledOpacity(disabled), {
            initialProps: { disabled: false },
        });

        mockWithTiming.mockClear();
        mockCancelAnimation.mockClear();

        rerender({ disabled: true });

        expect(mockCancelAnimation).toHaveBeenCalled();
        expect(mockWithTiming).toHaveBeenCalledWith(0.6, { duration: 150 });
    });
});
