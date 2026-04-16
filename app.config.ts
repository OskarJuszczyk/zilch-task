import 'tsx/cjs';
import { ConfigContext, ExpoConfig } from 'expo/config';

import { SUPPORTED_LANGUAGES } from '@i18n/resources';

const PACKAGE = 'com.ZilchTask';

const bgColor = '#ffffff'

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        name: 'ZilchTask',
        slug: 'zilch-task',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'zilch-task',
        userInterfaceStyle: 'light',
        backgroundColor: bgColor,
        ios: {
            icon: './assets/expo.icon',
            bundleIdentifier: PACKAGE,
            supportsTablet: false,
            infoPlist: {
                CFBundleLocalizations: ['en'],
            },
        },
        android: {
            adaptiveIcon: {
                backgroundColor: bgColor,
                foregroundImage: './assets/images/android-icon-foreground.png',
                backgroundImage: './assets/images/android-icon-background.png',
                monochromeImage: './assets/images/android-icon-monochrome.png',
            },
            predictiveBackGestureEnabled: false,
            package: PACKAGE,
        },
        plugins: [
            'expo-router',
            'expo-system-ui',
            [
                'expo-local-authentication',
                {
                    faceIDPermission: 'Allow $(PRODUCT_NAME) to use Face ID.',
                },
            ],
            [
                'expo-splash-screen',
                {
                    backgroundColor: bgColor,
                    android: {
                        image: './assets/images/splash-icon.png',
                        imageWidth: 76,
                    },
                },
            ],
            'expo-image',
            'expo-asset',
            [
                'expo-font',
                {
                    fonts: [
                        './assets/fonts/SaansBook.ttf',
                        './assets/fonts/SaansMedium.ttf',
                        './assets/fonts/SaansRegular.ttf',
                        './assets/fonts/SaansSemibold.ttf',
                    ],
                },
            ],
            [
                'expo-localization',
                {
                    supportedLocales: SUPPORTED_LANGUAGES,
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
            tsconfigPaths: true,
            reactCompiler: true,
        },
        extra: {
            router: {},
            eas: {},
        },
    };
};
