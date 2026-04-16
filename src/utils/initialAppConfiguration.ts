import * as Application from 'expo-application';
import * as Device from 'expo-device';
import * as SplashScreen from 'expo-splash-screen';

import '@i18n/index';
import { dayjsSetup } from '@utils/date/dayjsSetup';
import { log } from '@utils/logger';

export function initialAppConfiguration() {
    SplashScreen.setOptions({ fade: true });

    dayjsSetup();

    ErrorUtils.setGlobalHandler(error => {
        log.error('Unhandled error', error);
        // We should add sentry etc here
    });

    log.info('Initial app configuration done', {
        appVersion: Application.nativeApplicationVersion,
        deviceName: Device.deviceName,
        osVersion: Device.osVersion,
    });
}
