import { useWindowDimensions } from 'react-native';

import { useUnistyles } from 'react-native-unistyles';

export const useCardListDimensions = () => {
    const { width } = useWindowDimensions();
    const { theme } = useUnistyles();
    const gap = theme.spacing.md;
    const previewFromOtherCard = theme.spacing.xs;
    const spacing = 2 * (gap + previewFromOtherCard);

    const cardWidth = width - spacing;
    const interval = cardWidth + gap;

    return {
        cardWidth,
        interval,
    };
};
