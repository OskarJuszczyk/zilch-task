import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';

import { ColorSchemaSvgIconStyles, SvgIcon, SvgIconValues } from '@assets/SvgIcon';
import DisplayPanel from '@components/Panels/DisplayPanel';
import { Body } from '@components/Texts/Body';
import { TextColor } from '@components/Texts/types';

export const BannerVariants = {
    info: 'info',
    critical: 'critical',
    warning: 'warning',
} as const;

export type BannerVariant = RecordValues<typeof BannerVariants>;

type BannerProps = {
    icon: SvgIconValues;
    text: string;
    iconSize?: number;
} & UnistylesVariants<typeof styles>;

export const Banner = ({
    type = BannerVariants.info,
    isFullRadius = true,
    isFullWidth = false,
    icon: leadingIcon,
    text: label,
    iconSize = SvgIcon.Sizes['16'],
}: BannerProps) => {
    styles.useVariants({ type, isFullRadius, isFullWidth });

    const iconColorSchema = getIconColorSchema(type);
    const bodyColorSchema = getBodyColorSchema(type);

    return (
        <DisplayPanel shouldDisplayContent withFade animateOnMount={false} style={styles.container}>
            <SvgIcon icon={leadingIcon} size={iconSize} colorSchema={iconColorSchema} />

            <Body variant="sm" colorSchema={bodyColorSchema} ellipsizeMode="middle" style={styles.text}>
                {label}
            </Body>
        </DisplayPanel>
    );
};

const getBodyColorSchema = (type: BannerVariant): TextColor => {
    return `${type}.strong`;
};

const getIconColorSchema = (type: BannerVariant): ColorSchemaSvgIconStyles['colorSchema'] => {
    return type;
};

Banner.Variant = BannerVariants;

const styles = StyleSheet.create(theme => ({
    container: {
        maxWidth: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        gap: theme.spacing.xs,
        variants: {
            type: {
                [BannerVariants.critical]: {
                    backgroundColor: theme.color.surface.critical.muted,
                },
                [BannerVariants.warning]: {
                    backgroundColor: theme.color.surface.warning.muted,
                },
                [BannerVariants.info]: {
                    backgroundColor: theme.color.surface.neutral.muted,
                },
            },
            isFullRadius: {
                true: {
                    borderRadius: theme.borderRadius.full,
                },
                false: {
                    borderRadius: theme.borderRadius.lg,
                },
            },
            isFullWidth: {
                true: {
                    width: '100%',
                },
                false: {
                    width: 'auto',
                },
            },
        },
    },
    text: {
        variants: {
            isFullRadius: {},
            type: {},
            isFullWidth: {
                true: {
                    flex: 1,
                },
            },
        },
    },
}));
