import { isDefinedNonNull } from '@utils/isDefinedNonNull';

describe('isDefinedNonNull', () => {
    it('returns true for defined non-null values', () => {
        expect(isDefinedNonNull(0)).toBeTrue();
        expect(isDefinedNonNull('')).toBeTrue();
        expect(isDefinedNonNull(false)).toBeTrue();
        expect(isDefinedNonNull([])).toBeTrue();
        expect(isDefinedNonNull({})).toBeTrue();
        expect(isDefinedNonNull('hello')).toBeTrue();
    });

    it('returns false for null', () => {
        expect(isDefinedNonNull(null)).toBeFalse();
    });

    it('returns false for undefined', () => {
        expect(isDefinedNonNull(undefined)).toBeFalse();
    });

    it('returns false for string "null"', () => {
        expect(isDefinedNonNull('null')).toBeFalse();
    });

    it('returns false for string "undefined"', () => {
        expect(isDefinedNonNull('undefined')).toBeFalse();
    });
});
