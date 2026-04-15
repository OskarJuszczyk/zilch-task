import { PropsWithChildren } from 'react';

import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

type CardHeaderProps = PropsWithChildren;

export function CardHeader({ children }: CardHeaderProps) {
    return <View style={styles.header}>{children}</View>;
}

const styles = StyleSheet.create(theme => ({
    header: {
        padding: theme.spacing['3Xs'],
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
}));
