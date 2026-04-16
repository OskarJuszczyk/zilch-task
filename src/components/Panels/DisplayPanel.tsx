import { PropsWithChildren, useEffect, useRef } from 'react';

import { LayoutChangeEvent, StyleProp, ViewProps, ViewStyle } from 'react-native';

import Animated, { AnimatedProps, FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { Duration, KeyframeProps } from '@components/Panels/types';
import { getTestProps, TestProps } from '@utils/testing/testProps';

type DisplayPanelVisibilityProps = { withFade?: true; style?: StyleProp<ViewStyle> } | { withFade?: false; style?: never };

export type DisplayPanelProps = PropsWithChildren<
    {
        shouldDisplayContent?: boolean;
        animateOnMount?: boolean;
        layoutAnimation?: typeof LinearTransition;
        onLayout?: (event: LayoutChangeEvent) => void;
    } & TestProps &
        KeyframeProps &
        DisplayPanelVisibilityProps
>;

type ViewAnimatedProps = Pick<AnimatedProps<ViewProps>, 'entering' | 'exiting' | 'layout'>;

const DisplayPanel = ({
    style,
    shouldDisplayContent,
    withFade = false,
    children,
    layoutAnimation = LinearTransition,
    testID,
    duration = Duration.quick,
    enteringAnimation = FadeIn,
    exitingAnimation = FadeOut,
    animateOnMount = true,
    onLayout,
}: DisplayPanelProps) => {
    const animateOnMountRef = useRef(animateOnMount);

    useEffect(() => {
        animateOnMountRef.current = true;
    }, []);

    const animatedProps: ViewAnimatedProps = animateOnMountRef.current
        ? { entering: enteringAnimation.duration(duration), exiting: exitingAnimation.duration(duration), layout: layoutAnimation }
        : {};

    if (!shouldDisplayContent) {
        return null;
    }

    if (!withFade) {
        return children;
    }

    return (
        <Animated.View style={style} {...animatedProps} {...getTestProps({ testID })} onLayout={onLayout}>
            {children}
        </Animated.View>
    );
};

DisplayPanel.Duration = Duration;

export default DisplayPanel;
