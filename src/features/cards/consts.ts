import { FadeIn, FadeOut } from 'react-native-reanimated';

import { CardDesign, CardDesigns } from '@cards/types';
import { BadgeVariant, BadgeVariants } from '@components/Badge/types';
import { Duration } from '@components/Panels/types';
import { BodyProps } from '@components/Texts/Body';
import { AppTheme } from '@styles/unistyles';

// Dark designs use strong/neutral tokens, light designs use inverted tokens
const DARK_DESIGNS = [CardDesigns.Obsidian, CardDesigns.Emerald, CardDesigns.Graphite, CardDesigns.Amethyst, CardDesigns.Oceanic] as const;
const LIGHT_DESIGNS = [CardDesigns.Arctic, CardDesigns.Lavender, CardDesigns.Lime, CardDesigns.Aero] as const;

function createDesignRecord<T>(dark: T, light: T): Record<CardDesign, T> {
    return {
        ...Object.fromEntries(DARK_DESIGNS.map(d => [d, dark])),
        ...Object.fromEntries(LIGHT_DESIGNS.map(d => [d, light])),
    } as Record<CardDesign, T>;
}

export type IconColor = NestedKeyOf<AppTheme['color']['icon']>;

export const ICON_COLOR_SCHEMA_BY_DESIGN = createDesignRecord<IconColor>('strong', 'inverted');

type TextColorSchema = Extract<BodyProps['colorSchema'], 'neutral.strong' | 'inverted.strong'>;

export const TEXT_COLOR_SCHEMA_BY_DESIGN = createDesignRecord<TextColorSchema>('neutral.strong', 'inverted.strong');

type SecondaryTextColorSchema = Extract<BodyProps['colorSchema'], 'neutral.default' | 'inverted.default'>;

export const SECONDARY_TEXT_COLOR_SCHEMA_BY_DESIGN = createDesignRecord<SecondaryTextColorSchema>('neutral.default', 'inverted.default');

export const BADGE_VARIANT_BY_DESIGN = createDesignRecord<BadgeVariant>(BadgeVariants.inverted, BadgeVariants.neutral);

type BlurRatio = { height: number; width: number };

export const BLUR_RATIO_BY_DESIGN = createDesignRecord<BlurRatio>({ height: 0.9, width: 2 }, { height: 1.1, width: 2 });

export const ENTERING_ANIMATION = FadeIn.duration(Duration.medium).delay(Duration.quick);
export const EXITING_ANIMATION = FadeOut.duration(Duration.medium);
