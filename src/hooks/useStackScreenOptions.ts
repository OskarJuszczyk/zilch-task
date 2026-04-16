import { useUnistyles } from 'react-native-unistyles';

import { StackScreenProps } from 'expo-router';

type ExtendedStackNavigationOptions = StackScreenProps['options'];

export function useStackScreenOptions() {
    const { theme } = useUnistyles();

    return {
        headerBackButtonDisplayMode: 'minimal',
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: theme.color.surface.default,
        },
        headerTintColor: theme.color.text.neutral.default,
        contentStyle: {
            backgroundColor: theme.color.surface.default,
        },
    } satisfies ExtendedStackNavigationOptions;
}
