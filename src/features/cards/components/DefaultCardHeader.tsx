import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { Chip } from '@cards/assets/Chip';
import { BADGE_VARIANT_BY_DESIGN } from '@cards/consts';
import { CardDesign, CardType } from '@cards/types';
import Badge from '@components/Badge/Badge';

type DefaultCardHeaderProps = {
    type: CardType;
    designId: CardDesign;
};

export function DefaultCardHeader({ type, designId }: DefaultCardHeaderProps) {
    const { t } = useTranslation('translation', { keyPrefix: 'cards.enums.types' });

    const badgeVariant = BADGE_VARIANT_BY_DESIGN[designId];

    return (
        <View style={styles.row}>
            <Badge variant={badgeVariant} size={Badge.Size.sm} mode={Badge.Mode.subtle} text={t(type)} />
            <Chip width={40} height={32} />
        </View>
    );
}

const styles = StyleSheet.create(theme => ({
    row: {
        flexShrink: 1,
        width: '100%',
        gap: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
}));
