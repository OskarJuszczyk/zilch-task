import { ColorValue } from '@styles/unistyles';

export type SVGGraphicProps = {
    fill: ColorValue;
    width?: number;
    height?: number;
};

export const DEFAULT_ICON_SIZE: number = 24;

export const SvgIconSize = {
    12: 12,
    16: 16,
    20: 20,
    24: 24,
    32: 32,
    40: 40,
    48: 48,
} as const;
export type SvgIconSizes = (typeof SvgIconSize)[keyof typeof SvgIconSize];
