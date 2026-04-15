import { TextColor } from '@components/Texts/types';
import { AppTheme, ColorValue } from '@styles/unistyles';
import { isDefinedNonNull } from '@utils/isDefinedNonNull';

type ValidKeys = Exclude<keyof AppTheme['color']['text'], 'disabled'>;
function getTextColor(key: ValidKeys, theme: AppTheme) {
    if (key === 'link') {
        const linkColors = theme.color.text['link'];

        const keys = isDefinedNonNull(linkColors) ? Object.keys(linkColors) : [];

        const reduced = keys.reduce(
            (acc, key) => {
                const linkColor = linkColors[key];

                const entries = isDefinedNonNull(linkColor) ? Object.entries(linkColor) : [];

                for (const [internalKey, value] of entries) {
                    const validKey: TextColor = `link.${key}.${internalKey}`;
                    acc[validKey] = {
                        color: value,
                    };
                }
                return acc;
            },
            {} as Record<TextColor, { color: ColorValue }>,
        );

        return reduced;
    }

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

const keys = ['accent', 'warning', 'critical', 'info', 'inverted', 'neutral', 'link'] as const;
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
