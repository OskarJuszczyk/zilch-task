import { StyleSheet } from 'react-native-unistyles';

import { BadgeIconVariants, BadgeModes, BadgeSizes, BadgeVariant, BadgeVariants } from '@components/Badge/types';
import { ColorValue } from '@styles/unistyles';

export const styles = StyleSheet.create(theme => ({
    badge: {
        borderRadius: theme.borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: theme.spacing['3Xs'],

        variants: {
            variant: {
                [BadgeVariants.accent]: {
                    backgroundColor: theme.color.badge.surface.accent,
                },
                [BadgeVariants.warning]: {
                    backgroundColor: theme.color.badge.surface.warning,
                },
                [BadgeVariants.critical]: {
                    backgroundColor: theme.color.badge.surface.critical,
                },
                [BadgeVariants.info]: {
                    backgroundColor: theme.color.badge.surface.info,
                },
                [BadgeVariants.neutral]: {
                    backgroundColor: theme.color.badge.surface.neutral,
                },
                [BadgeVariants.inverted]: {
                    backgroundColor: theme.color.badge.surface.inverted,
                },
            } satisfies Record<BadgeVariant, { backgroundColor: ColorValue }>,
            mode: {
                [BadgeModes.plain]: {
                    backgroundColor: 'transparent',
                },
                [BadgeModes.subtle]: {},
            },

            size: {
                [BadgeSizes.sm]: {
                    paddingVertical: 0,
                },
                [BadgeSizes.md]: {
                    paddingVertical: theme.spacing['4Xs'],
                },
            },
        },
    },
    padding: {
        variants: {
            hasIcon: {
                [BadgeIconVariants.subtleIcon]: {
                    paddingLeft: theme.spacing['3Xs'],
                    paddingRight: theme.spacing['xs'],
                },
                [BadgeIconVariants.subtleNoIcon]: {
                    paddingHorizontal: theme.spacing['2Xs'],
                },
                [BadgeIconVariants.none]: {
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                },
            },
        },
    },
    text: {
        color: theme.color.text.neutral.strong,

        variants: {
            variant: {
                [BadgeVariants.accent]: {
                    color: theme.color.badge.text.accent,
                },
                [BadgeVariants.warning]: {
                    color: theme.color.badge.text.warning,
                },
                [BadgeVariants.critical]: {
                    color: theme.color.badge.text.critical,
                },
                [BadgeVariants.info]: {
                    color: theme.color.badge.text.info,
                },
                [BadgeVariants.neutral]: {
                    color: theme.color.badge.text.neutral,
                },
                [BadgeVariants.inverted]: {
                    color: theme.color.badge.text.inverted,
                },
            } satisfies Record<BadgeVariant, { color: ColorValue }>,
        },
    },
}));

export const iconsStyles = StyleSheet.create(theme => ({
    icon: {
        variants: {
            variant: {
                [BadgeVariants.accent]: {
                    color: theme.color.badge.icon.accent,
                },
                [BadgeVariants.warning]: {
                    color: theme.color.badge.icon.warning,
                },
                [BadgeVariants.critical]: {
                    color: theme.color.badge.icon.critical,
                },
                [BadgeVariants.info]: {
                    color: theme.color.badge.icon.info,
                },
                [BadgeVariants.neutral]: {
                    color: theme.color.badge.icon.neutral,
                },
                [BadgeVariants.inverted]: {
                    color: theme.color.badge.icon.inverted,
                },
            },
        },
    },
}));
