import en from '@i18n/locales/en';

export const I18N_DEFAULT_NAMESPACE = 'translation';
export const LANGUAGES = { EN: 'en' } as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const DEFAULT_LANGUAGE = LANGUAGES.EN;

export const SUPPORTED_LANGUAGES = Object.values(LANGUAGES);

export const langResources = {
    [LANGUAGES.EN]: {
        [I18N_DEFAULT_NAMESPACE]: en,
    },
} as const;
