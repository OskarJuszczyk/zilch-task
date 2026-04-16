import { View } from 'react-native';

import { SvgIcon, SvgIconValues } from '@assets/SvgIcon';
import { iconsStyles, styles } from '@components/Badge/stylesheet';
import { BadgeIconVariants, BadgeMode, BadgeModes, BadgeSize, BadgeSizes, BadgeVariant, BadgeVariants } from '@components/Badge/types';
import { Body } from '@components/Texts/Body';
import { getTestProps, TestProps } from '@utils/testing/testProps';

export type BadgeProps = {
    variant: BadgeVariant;
    size: BadgeSize;
    mode: BadgeMode;
    text: string;
    icon?: WithUndefined<SvgIconValues>;
} & TestProps;

const getIconVariant = (mode: BadgeMode, hasIcon: boolean) => {
    switch (mode) {
        case BadgeModes.subtle:
            return hasIcon ? BadgeIconVariants.subtleIcon : BadgeIconVariants.subtleNoIcon;
        default:
            return BadgeIconVariants.none;
    }
};

function Badge({ variant, size, mode, text, icon, testID }: BadgeProps) {
    const iconVariant = getIconVariant(mode, !!icon);

    styles.useVariants({
        size,
        variant,
        mode,
        hasIcon: iconVariant,
    });

    iconsStyles.useVariants({
        variant,
    });

    return (
        <View {...getTestProps({ testID })} style={[styles.badge, styles.padding]}>
            {icon && <SvgIcon size={SvgIcon.Sizes[12]} icon={icon} style={iconsStyles} />}
            <Body variant={'sm'} colorStyle={styles}>
                {text}
            </Body>
        </View>
    );
}
Badge.displayName = 'Badge';
Badge.Variant = BadgeVariants;
Badge.Mode = BadgeModes;
Badge.Size = BadgeSizes;

export default Badge;
