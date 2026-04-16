import { translationWithParams } from '__mocks__/react-i18next';

export const t = jest.fn().mockImplementation((key: string, params: object) => {
    if (params) {
        return translationWithParams(key, params);
    } else {
        return key;
    }
});

const changeLanguage = jest.fn();

module.exports = {
    ...jest.requireActual('i18next'),
    t,
    changeLanguage,
    language: 'EN',
};
