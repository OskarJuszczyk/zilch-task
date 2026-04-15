import { AppTheme } from '@styles/unistyles';

export type BadgeVariant = keyof AppTheme['color']['badge']['surface'];

export const BadgeVariants = {
    accent: 'accent',
    warning: 'warning',
    critical: 'critical',
    info: 'info',
    neutral: 'neutral',
    inverted: 'inverted',
} as const;

export const BadgeModes = {
    subtle: 'subtle',
    plain: 'plain',
} as const;

export const BadgeIconVariants = {
    subtleIcon: 'subtleIcon',
    subtleNoIcon: 'subtleNoIcon',
    none: 'none',
} as const;

export const BadgeSizes = {
    md: 'md',
    sm: 'sm',
} as const;

export type BadgeMode = keyof typeof BadgeModes;
export type BadgeSize = keyof typeof BadgeSizes;
