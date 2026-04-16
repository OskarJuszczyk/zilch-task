import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { SvgIcon, SvgIcons } from '@assets/SvgIcon';
import { CardStatus } from '@cards/types';
import { Banner } from '@components/Banner';
import { getTestProps } from '@utils/testing/testProps';

type CardInfoBannerProps = {
    status: CardStatus;
};

const INFO_STATUSES: CardStatus[] = [CardStatus.PENDING, CardStatus.BLOCKED, CardStatus.EXPIRED];

const ICON_SIZE = SvgIcon.Sizes['20'];

const TEST_IDS = {
    container: 'card-info-banner',
} as const;

export const CardInfoBanner = ({ status }: CardInfoBannerProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'cardDetailsFlow.cardPreviewScreen.banners' });

    const isInfoStatus = INFO_STATUSES.includes(status);

    if (!isInfoStatus) {
        return null;
    }

    return (
        <View {...getTestProps({ testID: TEST_IDS.container })} style={styles.container}>
            {status === CardStatus.PENDING && (
                <Banner
                    isFullWidth
                    isFullRadius={false}
                    iconSize={ICON_SIZE}
                    icon={SvgIcons.AlertSolid}
                    text={t(status)}
                    type={Banner.Variant.warning}
                />
            )}
            {status === CardStatus.BLOCKED && (
                <Banner
                    isFullWidth
                    isFullRadius={false}
                    iconSize={ICON_SIZE}
                    icon={SvgIcons.AlertSolid}
                    text={t(status)}
                    type={Banner.Variant.critical}
                />
            )}

            {status === CardStatus.EXPIRED && (
                <Banner
                    isFullWidth
                    isFullRadius={false}
                    iconSize={ICON_SIZE}
                    icon={SvgIcons.AlertSolid}
                    text={t(status)}
                    type={Banner.Variant.info}
                />
            )}
        </View>
    );
};

CardInfoBanner.TestIds = TEST_IDS;

const styles = StyleSheet.create(theme => ({
    container: {
        paddingHorizontal: theme.spacing.xl,
    },
}));
