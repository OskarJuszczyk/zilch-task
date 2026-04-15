import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { SvgIcons } from '@assets/SvgIcon';
import { CardStatus } from '@cards/types';
import { Banner } from '@components/Banner';

export const CardStatusBadge = ({ status }: { status: CardStatus }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'cardDetailsFlow.cardPreviewScreen.badges' });

    const shouldDisplayBadge = isVisibleBadge(status);

    if (!shouldDisplayBadge) {
        return null;
    }

    return (
        <View style={styles.overlay}>
            {status === CardStatus.BLOCKED && <Banner type={Banner.Variant.critical} text={t(status)} icon={SvgIcons.SquareLockSolid} />}

            {status === CardStatus.FROZEN && <Banner type={Banner.Variant.info} text={t(status)} icon={SvgIcons.SnowSolid} />}

            {status === CardStatus.PENDING && <Banner type={Banner.Variant.warning} text={t(status)} icon={SvgIcons.ClockSolid} />}

            {status === CardStatus.EXPIRED && <Banner type={Banner.Variant.info} text={t(status)} icon={SvgIcons.ClockSolid} />}
        </View>
    );
};

function isVisibleBadge(status: CardStatus): boolean {
    return status === CardStatus.BLOCKED || status === CardStatus.FROZEN || status === CardStatus.PENDING || status === CardStatus.EXPIRED;
}

const styles = StyleSheet.create(() => ({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
