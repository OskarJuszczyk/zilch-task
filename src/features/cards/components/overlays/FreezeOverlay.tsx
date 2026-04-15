import { useImperativeHandle } from 'react';

import { View } from 'react-native';

import Animated, {
    cancelAnimation,
    Extrapolation,
    interpolate,
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { BlurView } from 'expo-blur';

import { CardStatus } from '@cards/types';
import { CardStatusBadge } from '@features/cards/components/CardStatusBadge/CardStatusBadge';
import { CARD_OVERLAY_ANIMATION_TIMINGS } from '@features/cards/components/overlays/consts';
import { useLayout } from '@hooks/useLayout';
import { Blur, Canvas, Image, Oval, useImage } from '@shopify/react-native-skia';

type OnFreezeProps = {
    withAnimation?: boolean;
};

export type FreezeOverlayRef = {
    onFreeze: (props: OnFreezeProps) => void;
    onUnfreeze: VoidFunction;
};

type FreezeOverlayProps = {
    ref?: React.RefObject<FreezeOverlayRef | null>;
    blurTargetRef: React.RefObject<View | null>;
};

const Config = {
    CardBlurIntensity: { start: 0, end: 6 },
    BadgeOpacity: { start: 0, end: 1 },
    EllipseScale: { start: 1, mid: 0.5, end: 0 },
    EllipseBlur: 24,
    BlurReductionFactor: 6,
};

const inputRangeEllipseScale = [Config.EllipseScale.end, Config.EllipseScale.start];
const inputRangeEllipseBlur = [Config.EllipseScale.start, Config.EllipseScale.mid];

export function FreezeOverlay({ ref, blurTargetRef }: FreezeOverlayProps) {
    const scale = useSharedValue(Config.EllipseScale.start);
    const opacity = useSharedValue(Config.BadgeOpacity.start);

    const image = useImage(require('@static/images/cards/freeze.png'));
    const { layout, onLayout } = useLayout();

    useImperativeHandle(ref, () => ({
        onFreeze: (props: OnFreezeProps) => {
            cancelAnimation(scale);
            cancelAnimation(opacity);
            if (props.withAnimation) {
                scale.set(
                    withTiming(Config.EllipseScale.end, CARD_OVERLAY_ANIMATION_TIMINGS.Overlay.Freeze, finished => {
                        if (finished) {
                            opacity.set(withTiming(Config.BadgeOpacity.end, CARD_OVERLAY_ANIMATION_TIMINGS.Badge));
                        }
                    }),
                );
            } else {
                scale.set(Config.EllipseScale.end);
                opacity.set(Config.BadgeOpacity.end);
            }
        },
        onUnfreeze: () => {
            cancelAnimation(scale);
            cancelAnimation(opacity);
            opacity.set(
                withTiming(Config.BadgeOpacity.start, CARD_OVERLAY_ANIMATION_TIMINGS.Badge, finished => {
                    if (finished) {
                        scale.set(withTiming(Config.EllipseScale.start, CARD_OVERLAY_ANIMATION_TIMINGS.Overlay.Freeze));
                    }
                }),
            );
        },
    }));

    const x = useDerivedValue(() => interpolate(scale.value, inputRangeEllipseScale, [layout.width / 2, -layout.width / 2]));
    const y = useDerivedValue(() => interpolate(scale.value, inputRangeEllipseScale, [0, -layout.height]));
    const width = useDerivedValue(() => interpolate(scale.value, inputRangeEllipseScale, [0, layout.width * 2]));
    const height = useDerivedValue(() => interpolate(scale.value, inputRangeEllipseScale, [0, layout.height * 2.4]));

    const animatedProps = useAnimatedProps(() => ({
        intensity: interpolate(
            scale.value,
            inputRangeEllipseBlur,
            [Config.CardBlurIntensity.start, Config.CardBlurIntensity.end],
            Extrapolation.CLAMP,
        ),
    }));

    const animatedOpacity = useAnimatedProps(() => ({
        opacity: opacity.value,
    }));

    return (
        <>
            <View style={[StyleSheet.absoluteFillObject, styles.border, styles.hiddenOverflow]}>
                <AnimatedBlur
                    animatedProps={animatedProps}
                    style={styles.flex}
                    blurTarget={blurTargetRef}
                    blurReductionFactor={Config.BlurReductionFactor}
                    blurMethod={'dimezisBlurView'}
                />
            </View>

            <Animated.View style={[StyleSheet.absoluteFillObject, styles.border, styles.hiddenOverflow, styles.mixBlendMode]} onLayout={onLayout}>
                <Canvas style={styles.canvas}>
                    <Image x={0} y={0} width={layout.width} height={layout.height} image={image} fit="cover" />

                    <Oval x={x} y={y} width={width} height={height}>
                        <Blur blur={Config.EllipseBlur} />
                    </Oval>
                </Canvas>
            </Animated.View>

            <Animated.View style={[StyleSheet.absoluteFillObject, animatedOpacity]}>
                <CardStatusBadge status={CardStatus.FROZEN} />
            </Animated.View>
        </>
    );
}

FreezeOverlay.Duration = CARD_OVERLAY_ANIMATION_TIMINGS.Overlay.Freeze.duration + CARD_OVERLAY_ANIMATION_TIMINGS.Badge.duration;

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

const styles = StyleSheet.create(theme => ({
    border: {
        borderRadius: theme.borderRadius.md,
    },
    canvas: {
        width: '100%',
        height: '100%',
    },
    flex: {
        flex: 1,
    },
    hiddenOverflow: {
        overflow: 'hidden',
    },
    mixBlendMode: {
        mixBlendMode: 'screen',
    },
}));
