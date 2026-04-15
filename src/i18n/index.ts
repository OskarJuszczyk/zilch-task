import { initReactI18next } from 'react-i18next';

import 'intl-pluralrules';
import { getLocales } from 'expo-localization';

import i18n from 'i18next';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, langResources } from '@i18n/resources';

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';

i18n.use(initReactI18next).init({
    resources: langResources,
    lng: deviceLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

export default i18n;
