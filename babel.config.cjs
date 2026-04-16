module.exports = function (api) {
    api.cache(true);
    return {
        presets: [['babel-preset-expo', { 'react-compiler': {} }], 'jotai-babel/preset'],
        plugins: [
            [
                'react-native-unistyles/plugin',
                {
                    root: 'src',
                    autoProcessImports: ['assets'],
                    autoProcessPaths: ['react-native-safe-area-context', '@shopify/react-native-skia'],
                },
            ],
            [
                'module-resolver',
                {
                    alias: [
                        { '@components': './src/components' },
                        { '@hooks': './src/hooks' },
                        { '@consts': './src/consts' },
                        { '@utils': './src/utils' },
                        { '@store': './src/store' },
                        { '@features': './src/features' },
                        { '@cards': './src/features/cards' },
                        { '@static': './assets' },
                        { '@assets': './src/assets' },
                        { '@styles': './src/styles' },
                        { '@i18n': './src/i18n' },
                    ],
                },
            ],
        ],
    };
};
