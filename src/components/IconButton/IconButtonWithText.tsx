import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import IconButton, { IconButtonProps } from '@components/IconButton/IconButton';
import { Body } from '@components/Texts/Body';

type IconButtonWithTextProps = {
    text: string;
} & Pick<IconButtonProps, 'icon' | 'disabled' | 'testID'> &
    Partial<Pick<IconButtonProps, 'variant' | 'onPress'>>;

export const IconButtonWithText = ({ icon, onPress, text, variant = 'secondary', disabled = false, testID }: IconButtonWithTextProps) => {
    return (
        <View style={styles.container}>
            <IconButton variant={variant} icon={icon} onPress={onPress} size="l" disabled={disabled} testID={testID} />
            <Body variant="sm" colorSchema="neutral.strong" numberOfLines={1} align="center">
                {text}
            </Body>
        </View>
    );
};

export const styles = StyleSheet.create(theme => ({
    container: {
        gap: theme.spacing.xs,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
    },
}));
