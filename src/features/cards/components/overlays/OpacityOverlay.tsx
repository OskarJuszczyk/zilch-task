import { useImperativeHandle } from 'react';

import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { CARD_OVERLAY_ANIMATION_TIMINGS, CARD_OVERLAY_ANIMATION_VALUES } from '@cards/components/overlays/consts';
import { CardStatus } from '@cards/types';
import { CardStatusBadge } from '@features/cards/components/CardStatusBadge/CardStatusBadge';

type OnTintProps = {
    withAnimation?: boolean;
};

export type OpacityOverlayRef = {
    onTint: (props: OnTintProps) => void;
    onUntint: VoidFunction;
};

type OpacityOverlayProps = {
  ref?: React.RefObject<OpacityOverlayRef | null>;
    status: Extract<CardStatus, typeof CardStatus.BLOCKED | typeof CardStatus.PENDING | typeof CardStatus.EXPIRED>;
};

export function OpacityOverlay({ ref, status }: OpacityOverlayProps) {
    const opacity = useSharedValue(CARD_OVERLAY_ANIMATION_VALUES.Opacity.start);
    const badgeOpacity = useSharedValue(CARD_OVERLAY_ANIMATION_VALUES.BadgeOpacity.start);

    useImperativeHandle(ref, () => ({
        onTint: (props: OnTintProps) => {
            cancelAnimation(badgeOpacity);
            cancelAnimation(opacity);
            if (props.withAnimation) {
                opacity.set(
                    withTiming(CARD_OVERLAY_ANIMATION_VALUES.Opacity.end, CARD_OVERLAY_ANIMATION_TIMINGS.Overlay.Opacity, finished => {
                        if (finished) {
                            badgeOpacity.set(withTiming(CARD_OVERLAY_ANIMATION_VALUES.BadgeOpacity.end, CARD_OVERLAY_ANIMATION_TIMINGS.Badge));
                        }
                    }),
                );
            } else {
                opacity.set(CARD_OVERLAY_ANIMATION_VALUES.Opacity.end);
                badgeOpacity.set(CARD_OVERLAY_ANIMATION_VALUES.BadgeOpacity.end);
            }
        },
        onUntint: () => {
            cancelAnimation(badgeOpacity);
            cancelAnimation(opacity);
            badgeOpacity.set(
                withTiming(CARD_OVERLAY_ANIMATION_VALUES.BadgeOpacity.start, CARD_OVERLAY_ANIMATION_TIMINGS.Badge, finished => {
                    if (finished) {
                        opacity.set(withTiming(CARD_OVERLAY_ANIMATION_VALUES.Opacity.start, CARD_OVERLAY_ANIMATION_TIMINGS.Overlay.Opacity));
                    }
                }),
            );
        },
    }));

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const animatedBadgeStyle = useAnimatedStyle(() => ({
        opacity: badgeOpacity.value,
    }));

    return (
        <>
            <Animated.View style={[styles.overlay, animatedStyle]} />

            <Animated.View style={[StyleSheet.absoluteFillObject, animatedBadgeStyle]}>
                <CardStatusBadge status={status} />
            </Animated.View>
        </>
    );
}

OpacityOverlay.Duration = CARD_OVERLAY_ANIMATION_TIMINGS.Overlay.Opacity.duration + CARD_OVERLAY_ANIMATION_TIMINGS.Badge.duration;

const styles = StyleSheet.create(theme => ({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.color.surface.default,
    },
}));
