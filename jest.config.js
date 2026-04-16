module.exports = {
    preset: 'jest-expo',
    testTimeout: 60000,
    setupFiles: ['@shopify/react-native-skia/jestSetup.js', 'react-native-unistyles/mocks', './src/styles/unistyles.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
    testMatch: ['**/src/**/?(*.)+(spec|test).ts?(x)'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    transformIgnorePatterns: [
        '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|@shopify|@callstack|burnt|jotai|react-native-logs))',
        '/node_modules/react-native-reanimated/plugin/',
    ],
    collectCoverageFrom: ['./src/**/*.{ts,tsx}', '!**/*.d.ts', '!**/assets/**'],
    coverageDirectory: 'coverage',
    cacheDirectory: './cache/jest',
    cache: true,
};
