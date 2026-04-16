import dayjs, { Dayjs } from 'dayjs';

import { DATE_FORMATTERS, DateFormatter } from '@utils/date/formatters';
import { isDefinedNonNull } from '@utils/isDefinedNonNull';

export type DateType = string | number | Dayjs | Date | null | undefined;

export type ValidDateType = string | number | Date | Dayjs;

export const isValidDateType = (date: DateType): date is ValidDateType => {
    if (!isDefinedNonNull(date)) {
        return false;
    }
    return dayjs(date).isValid();
};

/**
 * Formats a date as '25 Jul, 2024'
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: DateType, formatter: DateFormatter = DATE_FORMATTERS.DEFAULT): string | undefined => {
    if (!isValidDateType(date)) {
        return undefined;
    }

    return dayjs(date).format(formatter);
};
