import { StyleSheet, UnistylesThemes } from 'react-native-unistyles';

import { breakpoints } from '@styles/breakpoints';
import defaultTheme from '@styles/theme';

type AppThemes = {
    defaultTheme: typeof defaultTheme;
};

type AppBreakpoints = typeof breakpoints;

export type AppTheme = AppThemes['defaultTheme'];

export type ColorToken = `#${string}`;
type Colors = UnistylesThemes['defaultTheme']['color'];

export type ColorValue = Extract<ExtractValues<Colors>, ColorToken>;

declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppThemes {}
    export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
    themes: { defaultTheme: defaultTheme },
    settings: { initialTheme: 'defaultTheme' },
    breakpoints,
});
