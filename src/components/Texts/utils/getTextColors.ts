import { TextColor } from '@components/Texts/types';
import { AppTheme, ColorValue } from '@styles/unistyles';
import { isDefinedNonNull } from '@utils/isDefinedNonNull';

type ValidKeys = Exclude<keyof AppTheme['color']['text'], 'disabled'>;
function getTextColor(key: ValidKeys, theme: AppTheme) {
    const textColors = theme.color.text[key];
    const entries = isDefinedNonNull(textColors) ? Object.entries(textColors) : [];

    return entries.reduce(
        (acc, [value, color]) => {
            const validKey: TextColor = `${key}.${value}`;
            acc[validKey] = {
                color: color,
            };
            return acc;
        },
        {} as Record<TextColor, { color: ColorValue }>,
    );
}

const keys = ['accent', 'warning', 'critical', 'info', 'neutral'] as const;
export function getAllTextColors(theme: AppTheme) {
    const reduced = keys.reduce(
        (acc, key) => ({
            ...acc,
            ...getTextColor(key, theme),
        }),
        {} as Record<TextColor, { color: ColorValue }>,
    );

    reduced['disabled'] = {
        color: theme.color.text.disabled,
    };

    return reduced;
}
