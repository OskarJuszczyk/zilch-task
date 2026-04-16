export const IconButtonVariants = {
    primary: 'primary',
    secondary: 'secondary',
} as const;

export const IconButtonSizes = {
    l: 'l',
    m: 'm',
    s: 's',
} as const;

export type IconButtonVariant = keyof typeof IconButtonVariants;
export type IconButtonSize = keyof typeof IconButtonSizes;
