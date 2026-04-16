export const CONFIG = {
    IS_PROD: process.env.EXPO_PUBLIC_IS_PROD === 'true',
    E2E_BYPASS_BIOMETRICS: process.env.EXPO_PUBLIC_E2E_BYPASS_BIOMETRICS === 'true',
} as const;
