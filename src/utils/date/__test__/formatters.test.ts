import { DATE_FORMATTERS } from '@utils/date/formatters';

describe('DATE_FORMATTERS', () => {
    it('contains all expected formatter keys', () => {
        expect(DATE_FORMATTERS).toEqual({
            CARD: 'MM/YY',
            DEFAULT: 'll',
            DATE_ONLY: 'DD MMM YYYY',
            TIME_ONLY: 'LT',
            FULL: 'DD MMM YYYY, LT',
            SHORT_DATE_WITH_TIME: 'ddd, LT',
        });
    });

    it('has correct number of formatters', () => {
        expect(Object.keys(DATE_FORMATTERS)).toHaveLength(6);
    });
});
