import { StyleSheet } from 'react-native-unistyles';

import { IconButtonSizes, IconButtonVariant } from '@components/IconButton/types';
import { IconButtonSizeRecord } from '@components/IconButton/consts';

export const styles = StyleSheet.create(theme => ({
    button: {
        borderRadius: theme.borderRadius.button.pill,
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        aspectRatio: 1,
        variants: {
            size: {
                [IconButtonSizes.l]: {
                    width: IconButtonSizeRecord[IconButtonSizes.l],
                },
                [IconButtonSizes.m]: {
                    width: IconButtonSizeRecord[IconButtonSizes.m],
                },
                [IconButtonSizes.s]: {
                    width: IconButtonSizeRecord[IconButtonSizes.s],
                },
            },
        },
    },
    buttonDefaultBackgroundColor: (variant: IconButtonVariant) => ({
        backgroundColor: theme.color.button[variant].fill.default,
    }),
}));
