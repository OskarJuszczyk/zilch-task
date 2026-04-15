import { consoleTransport, logger as nativeLogger } from 'react-native-logs';

import { CONFIG } from '@consts/config';

export const isJest = Boolean(process.env['JEST_WORKER_ID']);

// Define log levels
const logLevels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
} as const;

export type LogType = keyof typeof logLevels;

const logValues: Record<LogType, string> = {
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error',
};

const config = {
    levels: logLevels,
    severity: !CONFIG.IS_PROD ? 'debug' : 'info',
    transport: [consoleTransport],
    transportOptions: {
        colors: {
            info: 'blueBright' as const,
            warn: 'yellowBright' as const,
            error: 'redBright' as const,
            debug: 'grey' as const,
        },
        errorLevels: ['error'],
    },
    dateFormat: 'time',
    printLevel: !CONFIG.IS_PROD,
    printDate: true,
    enabled: true,
    async: true,
    enabledExtensions: !CONFIG.IS_PROD
        ? [logValues.debug, logValues.info, logValues.warn, logValues.error]
        : [logValues.info, logValues.warn, logValues.error],
};

// Create logger instance
const loggerInstance = nativeLogger.createLogger(config);

// Export the base logger instance
export const log = loggerInstance;

/**
 * Usage Examples:
 *
 * // Using extended loggers (recommended)
 * import { debugLogger, infoLogger, warnLogger, errorLogger } from '@utils/logger';
 *
 * // Extended loggers must use method syntax (they are not directly callable)
 * debugLogger.info('Debug information', { userId: 123 });
 * debugLogger.debug('Detailed debug message');
 * infoLogger.info('User logged in successfully');
 * infoLogger.warn('Something to note');
 * warnLogger.warn('API rate limit approaching', { remaining: 10 });
 * warnLogger.error('Critical warning', error);
 * errorLogger.error('Failed to fetch user data', error);
 *
 * // Using base logger
 * import { log } from '@utils/logger';
 *
 * log.debug('Debug message');
 * log.info('Info message');
 * log.warn('Warning message');
 *
 * // With multiple arguments
 * log.info('User action', { action: 'click', button: 'submit' }, additionalData);
 * infoLogger.info('User action', { action: 'click', button: 'submit' }, additionalData);
 *
 */
