import { Text as RNText } from 'react-native';

import { StyleSheet, withUnistyles } from 'react-native-unistyles';

import { TextComponentProps } from '@components/Texts/types';
import { getAllTextColors } from '@components/Texts/utils/getTextColors';
import { getTestProps } from '@utils/testing/testProps';

export type BodyProps = TextComponentProps<typeof styles>;

export function Body({ variant = 'lg', align = 'auto', children, style, colorSchema = 'neutral.strong', colorStyle, testID, ...props }: BodyProps) {
    styles.useVariants({ variant, align, color: colorSchema });

    return (
        <UniRnText {...props} {...getTestProps({ testID })} style={[styles.text, style, colorStyle?.text]}>
            {children}
        </UniRnText>
    );
}
const UniRnText = withUnistyles(RNText);

const styles = StyleSheet.create(theme => {
    return {
        text: {
            variants: {
                variant: theme.text.body,
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
    };
});
