import { renderHook } from '@testing-library/react-native';

import { useStackScreenOptions } from '@hooks/useStackScreenOptions';
import tokens from '@styles/theme';

jest.mock('expo-router', () => ({
    Stack: {},
}));

describe('useStackScreenOptions', () => {
    it('returns minimal back button display mode', () => {
        const { result } = renderHook(() => useStackScreenOptions());

        expect(result.current.headerBackButtonDisplayMode).toBe('minimal');
    });

    it('returns headerShadowVisible as false', () => {
        const { result } = renderHook(() => useStackScreenOptions());

        expect(result.current.headerShadowVisible).toBeFalse();
    });

    it('returns header background color from theme', () => {
        const { result } = renderHook(() => useStackScreenOptions());

        expect(result.current.headerStyle.backgroundColor).toBe(tokens.color.surface.default);
    });

    it('returns header tint color from theme', () => {
        const { result } = renderHook(() => useStackScreenOptions());

        expect(result.current.headerTintColor).toBe(tokens.color.text.neutral.default);
    });

    it('returns content background color from theme', () => {
        const { result } = renderHook(() => useStackScreenOptions());

        expect(result.current.contentStyle.backgroundColor).toBe(tokens.color.surface.default);
    });
});
