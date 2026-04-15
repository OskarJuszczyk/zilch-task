import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { formatDate, isValidDateType } from '@utils/date/dateUtils';
import { DATE_FORMATTERS } from '@utils/date/formatters';

dayjs.extend(localizedFormat);

describe('isValidDateType', () => {
    it('returns true for valid ISO string', () => {
        expect(isValidDateType('2024-07-25')).toBeTrue();
    });

    it('returns true for Date object', () => {
        expect(isValidDateType(new Date(2024, 6, 25))).toBeTrue();
    });

    it('returns true for unix timestamp', () => {
        expect(isValidDateType(1721865600000)).toBeTrue();
    });

    it('returns true for dayjs instance', () => {
        expect(isValidDateType(dayjs('2024-07-25'))).toBeTrue();
    });

    it('returns false for null', () => {
        expect(isValidDateType(null)).toBeFalse();
    });

    it('returns false for undefined', () => {
        expect(isValidDateType(undefined)).toBeFalse();
    });

    it('returns false for invalid date string', () => {
        expect(isValidDateType('not-a-date')).toBeFalse();
    });
});

describe('formatDate', () => {
    it('formats with default formatter', () => {
        const result = formatDate('2024-07-25');
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
    });

    it('formats with CARD formatter', () => {
        expect(formatDate('2024-07-25', DATE_FORMATTERS.CARD)).toBe('07/24');
    });

    it('formats with DATE_ONLY formatter', () => {
        expect(formatDate('2024-07-25', DATE_FORMATTERS.DATE_ONLY)).toBe('25 Jul 2024');
    });

    it('returns undefined for null', () => {
        expect(formatDate(null)).toBeUndefined();
    });

    it('returns undefined for undefined', () => {
        expect(formatDate(undefined)).toBeUndefined();
    });

    it('returns undefined for invalid string', () => {
        expect(formatDate('garbage')).toBeUndefined();
    });

    it('accepts Date object', () => {
        const result = formatDate(new Date(2024, 6, 25), DATE_FORMATTERS.DATE_ONLY);
        expect(result).toBe('25 Jul 2024');
    });

    it('accepts dayjs instance', () => {
        const result = formatDate(dayjs('2024-07-25'), DATE_FORMATTERS.CARD);
        expect(result).toBe('07/24');
    });
});
