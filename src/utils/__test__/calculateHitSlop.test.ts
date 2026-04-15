import { calculateHitSlop } from '@utils/calculateHitSlop';

describe('calculateHitSlop', () => {
    const DEFAULT_TARGET = 40;

    it('should return correct padding when actual size is less than target size', () => {
        expect(calculateHitSlop({ width: 20, height: 30 })).toEqual({ top: 5, bottom: 5, left: 10, right: 10 });
        expect(calculateHitSlop({ width: 40, height: 40 })).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
        expect(calculateHitSlop({ width: 0, height: 0 })).toEqual({ top: 20, bottom: 20, left: 20, right: 20 });
    });

    it('should return 0 padding when actual size is equal to target size', () => {
        expect(calculateHitSlop({ width: DEFAULT_TARGET, height: DEFAULT_TARGET })).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
    });

    it('should return 0 padding when actual size is greater than target size', () => {
        expect(calculateHitSlop({ width: 50, height: 60 })).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
        expect(calculateHitSlop({ width: 100, height: 100 })).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
    });

    it('should use default target size of 44 when target dimensions are not provided', () => {
        expect(calculateHitSlop({ width: 30, height: 20 })).toEqual({ top: 10, bottom: 10, left: 5, right: 5 });
    });

    it('should handle zero actual size correctly with default targets', () => {
        expect(calculateHitSlop({ width: 0, height: 0 })).toEqual({ top: 20, bottom: 20, left: 20, right: 20 });
    });

    it('should handle different target sizes', () => {
        const targets = { targetWidth: 30, targetHeight: 50 };
        expect(calculateHitSlop({ width: 10, height: 40, ...targets })).toEqual({ top: 5, bottom: 5, left: 10, right: 10 });
        expect(calculateHitSlop({ width: 30, height: 50, ...targets })).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
        expect(calculateHitSlop({ width: 40, height: 60, ...targets })).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
    });

    it('should handle mixed scenarios where one dimension needs padding and the other does not', () => {
        expect(calculateHitSlop({ width: 50, height: 30 })).toEqual({ top: 5, bottom: 5, left: 0, right: 0 }); // Width >= 44, Height < 44
        expect(calculateHitSlop({ width: 20, height: 50 })).toEqual({ top: 0, bottom: 0, left: 10, right: 10 }); // Width < 44, Height >= 44
    });

    it('should handle mixed scenarios with custom targets', () => {
        const targets = { targetWidth: 60, targetHeight: 20 };
        expect(calculateHitSlop({ width: 70, height: 10, ...targets })).toEqual({ top: 5, bottom: 5, left: 0, right: 0 });
        expect(calculateHitSlop({ width: 50, height: 30, ...targets })).toEqual({ top: 0, bottom: 0, left: 5, right: 5 });
    });
});
