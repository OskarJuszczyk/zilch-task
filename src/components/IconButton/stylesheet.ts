import { StyleSheet } from 'react-native-unistyles';

import { IconButtonSizeRecord } from '@components/IconButton/consts';
import { IconButtonSizes, IconButtonVariant } from '@components/IconButton/types';

export const styles = StyleSheet.create(theme => ({
    button: {
        borderRadius: theme.borderRadius.full,
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
