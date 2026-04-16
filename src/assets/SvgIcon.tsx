import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { SvgIconValues, SvgIcons, SvgIconsRecord } from '@assets/utils/svg';
import { SvgIconSize } from '@assets/utils/types';
import { AppTheme, ColorValue } from '@styles/unistyles';
import { getTestProps, TestProps } from '@utils/testing/testProps';

export type ColorSchemaSvgIconStyles = {
    colorSchema?: WithUndefined<SvgIconColor>;
    style?: never;
};

export type CustomSvgIconStyles = {
    colorSchema?: never;
    style?: ValidSvgIconStyles;
};

export type SvgIconStyles = ColorSchemaSvgIconStyles | CustomSvgIconStyles;

export type SvgIconProps = SvgIconStyles & {
    icon: SvgIconValues;
    size?: number;
} & TestProps;

function SvgIcon({ icon, colorSchema = 'default', testID, size = SvgIconSize[24], style }: SvgIconProps) {
    const Icon = SvgIconsRecord[icon];
    const colorSchemaNonDefault = colorSchema === 'default' ? undefined : colorSchema;
    styles.useVariants({ color: colorSchemaNonDefault });

    const fill = style?.icon.color ?? styles.icon.color;

    return (
        <View {...getTestProps({ testID })}>
            <Icon width={size} height={size} fill={fill} />
        </View>
    );
}

export type SvgIconColor = NestedKeyOf<AppTheme['color']['icon']>;

const styles = StyleSheet.create(theme => ({
    icon: {
        variants: {
            color: Object.entries(theme.color.icon).reduce(
                (acc, [key, color]) => ({
                    ...acc,
                    [key]: {
                        color,
                    },
                }),
                {} as Record<SvgIconColor, { color: ColorValue }>,
            ),
        },
    },
}));

type ValidSvgIconStyles = {
    icon: {
        color: ColorValue;
    };
};

SvgIcon.Icons = SvgIcons;
SvgIcon.Sizes = SvgIconSize;

export { SvgIcon, SvgIconValues, SvgIcons };
