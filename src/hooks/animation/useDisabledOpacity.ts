import { cancelAnimation, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const ENABLED_OPACITY = 1;
const DISABLED_OPACITY = 0.6;
const ANIMATION_DURATION = 150;

export function useDisabledOpacity(disabled: boolean) {
    const opacity = useSharedValue<number>(disabled ? DISABLED_OPACITY : ENABLED_OPACITY);

    useAnimatedReaction(
        () => disabled,
        disabled => {
            cancelAnimation(opacity);
            opacity.value = withTiming(disabled ? DISABLED_OPACITY : ENABLED_OPACITY, { duration: ANIMATION_DURATION });
        },
    );

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return { animatedStyle };
}
