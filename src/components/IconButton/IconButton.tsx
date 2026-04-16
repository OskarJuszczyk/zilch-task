import { GestureResponderEvent, Platform, Pressable, PressableProps } from 'react-native';

import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import * as Haptics from 'expo-haptics';

import { SvgIcon, SvgIconValues } from '@assets/SvgIcon';
import { IconButtonIconSizeRecord, IconButtonSizeRecord } from '@components/IconButton/consts';
import { styles } from '@components/IconButton/stylesheet';
import { IconButtonSize, IconButtonSizes, IconButtonVariant, IconButtonVariants } from '@components/IconButton/types';
import { useButtonPressAnimation } from '@hooks/animation/useButtonPressAnimation';
import { useDisabledOpacity } from '@hooks/animation/useDisabledOpacity';
import { calculateHitSlop } from '@utils/calculateHitSlop';
import { log } from '@utils/logger';
import { getTestProps, TestProps } from '@utils/testing/testProps';

export type IconButtonProps = {
    variant: IconButtonVariant;
    size?: IconButtonSize;
    icon: SvgIconValues;
    onPress: PressableProps['onPress'];
    disabled?: boolean;
} & TestProps;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const IconButton = ({ variant, size = IconButtonSizes.l, disabled = false, onPress, icon, testID }: IconButtonProps) => {
    styles.useVariants({ size });
    buttonIconStyles.useVariants({ color: variant });

    const { animatedStyle, onPressIn, onPressOut } = useButtonPressAnimation();

    const buttonActualSize = IconButtonSizeRecord[size];
    const hitslopValue = calculateHitSlop({ width: buttonActualSize, height: buttonActualSize });

    const iconSize = IconButtonIconSizeRecord[size];

    const onPressHandler = async (event: GestureResponderEvent) => {
        if (onPress) {
            try {
                if (Platform.OS === 'ios') {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }

                if (Platform.OS === 'android') {
                    await Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Confirm);
                }
            } catch (e) {
                log.error(e);
            }
            onPress(event);
        }
    };

    const { animatedStyle: disabledOpacityStyle } = useDisabledOpacity(disabled);

    return (
        <AnimatedPressable
            hitSlop={hitslopValue}
            style={[styles.button, styles.buttonDefaultBackgroundColor(variant), animatedStyle, disabledOpacityStyle]}
            onPress={onPressHandler}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            disabled={disabled}
            {...getTestProps({ testID, isPressable: true })}>
            <SvgIcon icon={icon} size={iconSize} style={buttonIconStyles} />
        </AnimatedPressable>
    );
};

IconButton.Size = IconButtonSizes;
IconButton.Variant = IconButtonVariants;

export default IconButton;

const buttonIconStyles = StyleSheet.create(theme => ({
    icon: {
        variants: {
            color: {
                primary: {
                    color: theme.color.button.primary.icon.default,
                },
                secondary: {
                    color: theme.color.button.secondary.icon.default,
                },
            },
        },
    },
}));
