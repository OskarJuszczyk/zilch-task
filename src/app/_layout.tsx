import { Text } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { ErrorBoundaryProps, Stack } from 'expo-router';

import { SetupApp } from '@components/SetupApp';
import { useStackScreenOptions } from '@hooks/useStackScreenOptions';
import { initialAppConfiguration } from '@utils/initialAppConfiguration';

initialAppConfiguration();

function RootLayout() {
    const stackScreenOptions = useStackScreenOptions();

    const { t } = useTranslation();

    return (
        <SetupApp>
            <Stack screenOptions={{ ...stackScreenOptions }} initialRouteName="index">
                <Stack.Screen name="index">
                    <Stack.Screen.Title>{t('title')}</Stack.Screen.Title>
                </Stack.Screen>
            </Stack>
        </SetupApp>
    );
}

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>{error.message}</Text>
            <Text onPress={retry}>Try Again?</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create(theme => ({
    container: {
        flex: 1,
        backgroundColor: theme.color.surface.default,
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default RootLayout;
