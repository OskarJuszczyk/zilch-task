import React, { PropsWithChildren, ReactNode, createElement, forwardRef } from 'react';

import { Text, View } from 'react-native';

export const translationWithParams = (key: string, params: object) => `${key} ${JSON.stringify(params)}`;

export const t = jest.fn().mockImplementation((key: string, params: object) => {
    if (params) {
        if ('returnObjects' in params && params.returnObjects !== undefined) {
            return {
                [key]: translationWithParams(key, params),
            };
        }

        return translationWithParams(key, params);
    } else {
        return key;
    }
});

const changeLanguage = jest.fn();
const i18n = { changeLanguage, t };

interface TransProps extends PropsWithChildren {
    i18nKey: string;
    components?: Record<number, React.ReactElement>;
}

const Trans = (props: TransProps) => (
    //@ts-ignore
    <MockComponent {...props} testID={'testID' in props ? props.testID : undefined}>
        <Text>
            {props.i18nKey}
            {Object.entries(props.components ?? {}).map(([key, c]) => (
                <React.Fragment key={key}>{c}</React.Fragment>
            ))}
        </Text>
    </MockComponent>
);

const useTranslation = () => {
    return {
        t: t,
        i18n: i18n,
    };
};

module.exports = {
    useTranslation,
    Trans,
    initReactI18next: {
        type: '3rdParty',
        init: () => {},
    },
    translationWithParams,
};

type MockComponentProps = { children?: ReactNode }

export const MockComponent = forwardRef<View, MockComponentProps>(({ children, ...props }, ref) => {
    return createElement(View, { ...props, ref }, children);
});
