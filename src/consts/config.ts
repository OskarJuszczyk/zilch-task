export const CONFIG = {
    IS_PROD: process.env.EXPO_PUBLIC_IS_PROD === 'true',
} as const;
