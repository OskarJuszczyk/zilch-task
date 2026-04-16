import { Platform } from 'react-native';

export interface TestProps {
    testID?: string | undefined;
    isPressable?: boolean | undefined;
}

export const getTestProps = ({ testID, isPressable }: TestProps) => {
    if (!testID) {
        return {};
    }

    if (Platform.OS === 'ios') {
        return {
            testID,
            accessible: isPressable ? true : false, //https://reactnative.dev/docs/accessibility#accessible
        };
    }

    return {
        testID,
        accessible: true,
        accessibilityLabel: testID,
    };
};
