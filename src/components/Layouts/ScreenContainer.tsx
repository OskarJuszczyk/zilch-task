import { FC } from 'react';

import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

export const ScreenContainer: FC<SafeAreaViewProps> = ({ children, style, ...rest }) => {
    return (
        <SafeAreaView edges={{ bottom: 'additive' }} {...rest} style={[styles.main, style]}>
            {children}
        </SafeAreaView>
    );
};

export const styles = StyleSheet.create(theme => ({
    main: {
        backgroundColor: theme.color.surface.default,
        flex: 1,
    },
}));
