import { ColorValue, Text as RNText } from 'react-native';

import { StyleSheet, withUnistyles } from 'react-native-unistyles';

import { TextComponentProps } from '@components/Texts/types';
import { getAllTextColors } from '@components/Texts/utils/getTextColors';
import { getTestProps } from '@utils/testing/testProps';

export type SubtitleProps = TextComponentProps<typeof styles>;

export function Subtitle({ variant = 'lg', align = 'auto', children, style, colorSchema = 'neutral.strong', colorStyle, testID, ...props }: SubtitleProps) {
    styles.useVariants({ variant, align, color: colorSchema });

    return (
        <UniRnText {...props} {...getTestProps({ testID })} style={[styles.text, style, colorStyle?.text]}>
            {children}
        </UniRnText>
    );
}
const UniRnText = withUnistyles(RNText);

const styles = StyleSheet.create(theme => ({
    text: {
        variants: {
            variant: theme.text.subtitle,

            color: getAllTextColors(theme),

            align: {
                left: {
                    textAlign: 'left',
                },
                center: {
                    textAlign: 'center',
                },
                right: {
                    textAlign: 'right',
                },
                auto: {
                    textAlign: 'auto',
                },
            },
        },
    },
    textColor: (color?: ColorValue) => (color ? { color } : {}),
}));
