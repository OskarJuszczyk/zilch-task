import { cancelAnimation, ReduceMotion, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const SPRING_CONFIG = {
    duration: 400,
    dampingRatio: 1,
    mass: 8,
    overshootClamping: true,
    energyThreshold: 6e-9,
    velocity: 0,
    reduceMotion: ReduceMotion.System,
} as const;

const DEFAULT_SCALE = 1;

const ACTIVE_SCALE = 0.94;

export function useButtonPressAnimation() {
    const scale = useSharedValue<number>(DEFAULT_SCALE);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const onPressIn = () => {
        cancelAnimation(scale);
        scale.value = withSpring(ACTIVE_SCALE, SPRING_CONFIG);
    };

    const onPressOut = () => {
        cancelAnimation(scale);
        scale.value = withSpring(DEFAULT_SCALE, SPRING_CONFIG);
    };

    return { animatedStyle, onPressIn, onPressOut };
}
