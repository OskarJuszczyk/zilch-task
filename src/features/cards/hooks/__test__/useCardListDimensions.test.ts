import { renderHook } from '@testing-library/react-native';

import { useCardListDimensions } from '@cards/hooks/useCardListDimensions';
import { Dimensions } from 'react-native';

describe('useCardListDimensions', () => {
    it('returns correct cardWidth and interval for screen width', () => {
        // gap = md = 16, previewFromOtherCard = xs = 8
        // spacing = 2 * (16 + 8) = 48
        const { result } = renderHook(() => useCardListDimensions());

        expect(result.current.cardWidth).toBe(Dimensions.get('window').width - 48);
        expect(result.current.interval).toBe(Dimensions.get('window').width - 48 + 16);
    });
});
