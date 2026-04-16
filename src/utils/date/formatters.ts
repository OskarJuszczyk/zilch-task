export const DATE_FORMATTERS = {
    CARD: 'MM/YY',
    DEFAULT: 'll',
    DATE_ONLY: 'DD MMM YYYY',
    TIME_ONLY: 'LT',
    FULL: 'DD MMM YYYY, LT',
    SHORT_DATE_WITH_TIME: 'ddd, LT',
} as const;

export type DateFormatter = RecordValues<typeof DATE_FORMATTERS>;
