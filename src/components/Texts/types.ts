import { PropsWithChildren } from 'react';

import { TextProps } from 'react-native';

import { UnistylesVariants } from 'react-native-unistyles';

import { AppTheme, ColorValue } from '@styles/unistyles';

type ValidTextStyles = {
    text: {
        color: ColorValue;
    };
};

type ColorSchemaTextColorStyle = {
    colorSchema?: TextColor | undefined;
    colorStyle?: never;
};

type StyleTextColorStyle = {
    colorSchema?: never;
    colorStyle?: ValidTextStyles;
};

type TextColorStyles = ColorSchemaTextColorStyle | StyleTextColorStyle;

export type TextColor = OnlyLeafNestedKeyOf<AppTheme['color']['text']>;
export type TextComponentProps<T> = TextProps & PropsWithChildren & TextColorStyles & Omit<UnistylesVariants<T>, 'color'>;
