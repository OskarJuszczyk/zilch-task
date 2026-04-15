import { PropsWithChildren } from 'react';

import { StyleProp, View, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

type CardContentProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
}>;

export function CardContent({ children, style }: CardContentProps) {
    return <View style={[cardStyles.content, style]}>{children}</View>;
}

const cardStyles = StyleSheet.create(() => ({
    content: {
        flex: 1,
    },
}));
