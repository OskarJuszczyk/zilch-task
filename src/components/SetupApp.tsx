import { PropsWithChildren } from 'react';

import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ReduceMotion, ReducedMotionConfig } from 'react-native-reanimated';

import { useNavigationContainerRef } from 'expo-router';

import { Provider } from 'jotai/react';

import { Sheets } from '@components/Sheets';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useBiometricSessionTimeout } from '@hooks/useBiometricSessionTimeout';
import { globalJotaiStore } from '@store/globalStore';

export function SetupApp({ children }: PropsWithChildren) {
    const navigationRef = useNavigationContainerRef();
    useReactNavigationDevTools(navigationRef);
    useBiometricSessionTimeout();

    return (
        <Provider store={globalJotaiStore}>
            <GestureHandlerRootView>
                <ReducedMotionConfig mode={__DEV__ ? ReduceMotion.Never : ReduceMotion.System} />
                <SheetProvider>
                    <Sheets />
                    {children}
                </SheetProvider>
            </GestureHandlerRootView>
        </Provider>
    );
}
