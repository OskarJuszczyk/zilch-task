// import the original type declarations
import 'i18next';
import en from '@i18n/locales/en';
import { I18N_DEFAULT_NAMESPACE } from '@i18n/resources';

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        defaultNS: [typeof I18N_DEFAULT_NAMESPACE];
        // custom resources type
        resources: {
            [I18N_DEFAULT_NAMESPACE]: typeof en;
        };
        keySeparator: '.';
    }
}
