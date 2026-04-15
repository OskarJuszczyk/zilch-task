import { Insets } from 'react-native';

const DEFAULT_TARGET_HIT_SLOP = 40;

/**
 * Calculates the padding needed for an element to meet a minimum touch target size
 * for both width and height independently.
 *
 * @param params - The dimensions of the touchable element and optional target dimensions.
 * @param params.width - The actual width of the touchable element.
 * @param params.height - The actual height of the touchable element.
 * @param params.targetWidth - The desired minimum touch target width. Defaults to 40.
 * @param params.targetHeight - The desired minimum touch target height. Defaults to 40.
 * @returns An object `{ top: number, bottom: number, left: number, right: number }` suitable for React Native's hitSlop prop.
 */
export function calculateHitSlop({
    width,
    height,
    targetWidth = DEFAULT_TARGET_HIT_SLOP,
    targetHeight = DEFAULT_TARGET_HIT_SLOP,
}: {
    width: number;
    height: number;
    targetWidth?: number;
    targetHeight?: number;
}): Insets {
    const calculatePadding = (actualSize: number, targetSize: number): number => {
        const difference = targetSize - actualSize;
        // If the element is already large enough or difference is negligible, no padding is needed.
        if (difference <= 0) {
            return 0;
        }
        // Divide the difference by 2 to get the padding for each side.
        return difference / 2;
    };

    const horizontalPadding = calculatePadding(width, targetWidth);
    const verticalPadding = calculatePadding(height, targetHeight);

    return {
        top: verticalPadding,
        bottom: verticalPadding,
        left: horizontalPadding,
        right: horizontalPadding,
    };
}
