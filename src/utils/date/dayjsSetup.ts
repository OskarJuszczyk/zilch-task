import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const dayjsSetup = () => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(relativeTime);
    dayjs.extend(duration);
    dayjs.extend(localizedFormat);

    dayjs.locale(require('dayjs/locale/en-gb'), undefined, true);

    // dayjs.locale(require('dayjs/locale/en'), undefined, true); DO NOT IMPORT AS THIS BREAKS DEFAULT EN-US LOCALE
    // IF you would like to support more locales, please load them here aswell, https://github.com/ladjs/dayjs-with-plugins/blob/master/src/index.js
};
