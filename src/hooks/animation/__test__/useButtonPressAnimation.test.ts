import { cancelAnimation, withSpring } from 'react-native-reanimated';
import { renderHook, act } from '@testing-library/react-native';

import { useButtonPressAnimation } from '@hooks/animation/useButtonPressAnimation';

jest.mock('react-native-reanimated', () => {
    const actual = jest.requireActual('react-native-reanimated/mock');
    return {
        ...actual,
        cancelAnimation: jest.fn(),
        withSpring: jest.fn((toValue: number) => toValue),
        useSharedValue: (initial: number) => ({ value: initial }),
        useAnimatedStyle: (fn: () => object) => fn(),
    };
});

const mockCancelAnimation = cancelAnimation as jest.MockedFunction<typeof cancelAnimation>;
const mockWithSpring = withSpring as jest.MockedFunction<typeof withSpring>;

beforeEach(() => {
    mockCancelAnimation.mockClear();
    mockWithSpring.mockClear();
});

describe('useButtonPressAnimation', () => {
    it('returns animatedStyle, onPressIn, and onPressOut', () => {
        const { result } = renderHook(() => useButtonPressAnimation());

        expect(result.current.animatedStyle).toBeDefined();
        expect(result.current.onPressIn).toBeFunction();
        expect(result.current.onPressOut).toBeFunction();
    });

    it('onPressIn cancels animation and springs to 0.94', () => {
        const { result } = renderHook(() => useButtonPressAnimation());

        act(() => {
            result.current.onPressIn();
        });

        expect(mockCancelAnimation).toHaveBeenCalledTimes(1);
        expect(mockWithSpring).toHaveBeenCalledWith(0.94, expect.objectContaining({ duration: 400 }));
    });

    it('onPressOut cancels animation and springs to 1', () => {
        const { result } = renderHook(() => useButtonPressAnimation());

        act(() => {
            result.current.onPressOut();
        });

        expect(mockCancelAnimation).toHaveBeenCalledTimes(1);
        expect(mockWithSpring).toHaveBeenCalledWith(1, expect.objectContaining({ duration: 400 }));
    });

    it('cancels previous animation before starting new one on press sequence', () => {
        const { result } = renderHook(() => useButtonPressAnimation());

        act(() => {
            result.current.onPressIn();
            result.current.onPressOut();
        });

        expect(mockCancelAnimation).toHaveBeenCalledTimes(2);
    });
});
