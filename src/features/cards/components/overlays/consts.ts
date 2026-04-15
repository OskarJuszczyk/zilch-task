import { Easing } from 'react-native-reanimated';

export const CARD_OVERLAY_ANIMATION_TIMINGS = {
    Badge: { duration: 350, easing: Easing.in(Easing.ease) },
    Overlay: {
        Freeze: { duration: 1300, easing: Easing.in(Easing.ease) },
        Opacity: { duration: 500, easing: Easing.in(Easing.ease) },
    },
} as const;

export const CARD_OVERLAY_ANIMATION_VALUES = {
    Opacity: { start: 0, end: 0.5 },
    BadgeOpacity: { start: 0, end: 1 },
};
