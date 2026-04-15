import { PropsWithChildren } from 'react';

import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

type CardFooterProps = PropsWithChildren;

export function CardFooter({ children }: CardFooterProps) {
    return <View style={cardStyles.footer}>{children}</View>;
}

const cardStyles = StyleSheet.create(theme => ({
    footer: {
        gap: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
}));
