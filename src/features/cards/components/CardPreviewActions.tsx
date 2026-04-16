import { useCallback } from 'react';

import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SheetManager } from 'react-native-actions-sheet';
import { StyleSheet } from 'react-native-unistyles';

import { useSetAtom } from 'jotai';

import { SvgIcons } from '@assets/SvgIcon';
import { toggleCardFreezeAtom } from '@cards/store/cards';
import { Card, CardStatus, isIssuedCard, IssuedCard } from '@cards/types';
import { generateMockCvc } from '@cards/utils/generateMockCvc';
import { IconButtonWithText, styles as IconButtonWithTextStyles } from '@components/IconButton/IconButtonWithText';
import DisplayPanel from '@components/Panels/DisplayPanel';
import { SheetName } from '@components/Sheets/consts';
import { useUnlockWithBiometrics } from '@hooks/useUnlockWithBiometrics';
import { showToast } from '@utils/toast';

type CardPreviewActionsProps = {
    card: Card;
};

export function CardPreviewActions({ card }: CardPreviewActionsProps) {
    const toggleCardFreeze = useSetAtom(toggleCardFreezeAtom);

    const { t } = useTranslation('translation', { keyPrefix: 'cardDetailsFlow.cardPreviewScreen' });

    const showCardDetails = useCallback((issuedCard: IssuedCard) => {
        SheetManager.show(SheetName.CardDetailsSheet, {
            payload: {
                details: {
                    cardholderName: issuedCard.cardholderName,
                    cardNumber: issuedCard.maskedPan,
                    expiryDate: issuedCard.expiryDate,
                    cvv: generateMockCvc(),
                },
            },
        });
    }, []);

    const { unlock, isBiometricsSessionActive } = useUnlockWithBiometrics({
        onSuccess: () => {
            if (isIssuedCard(card)) {
                showCardDetails(card);
            }
        },
        onUserCancel: () => {
            showToast({ title: t('snackbars.automaticClose') });
        },
    });

    const onDetailsPress = useCallback(() => {
        if (!isIssuedCard(card)) {
            return;
        }

        unlock();
    }, [card, unlock]);

    const isActive = card.status === CardStatus.ACTIVE;
    const isFrozen = card.status === CardStatus.FROZEN;

    return (
        <>
            <View style={styles.container}>
                <DisplayPanel withFade shouldDisplayContent={isBiometricsSessionActive} style={IconButtonWithTextStyles.container}>
                    <IconButtonWithText
                        testID={TEST_IDS.viewDetails}
                        icon={SvgIcons.ViewSolid}
                        text={t('actions.details')}
                        onPress={onDetailsPress}
                    />
                </DisplayPanel>
                <DisplayPanel withFade shouldDisplayContent={!isBiometricsSessionActive} style={IconButtonWithTextStyles.container}>
                    <IconButtonWithText
                        testID={TEST_IDS.unlockDetails}
                        icon={SvgIcons.SquareLockSolid}
                        text={t('actions.details')}
                        onPress={onDetailsPress}
                    />
                </DisplayPanel>
                <DisplayPanel withFade shouldDisplayContent={!isFrozen} style={IconButtonWithTextStyles.container}>
                    <IconButtonWithText
                        disabled={!isActive}
                        testID={TEST_IDS.freeze}
                        icon={SvgIcons.SnowSolid}
                        text={t('actions.freeze')}
                        onPress={toggleCardFreeze}
                    />
                </DisplayPanel>
                <DisplayPanel withFade shouldDisplayContent={isFrozen} style={IconButtonWithTextStyles.container}>
                    <IconButtonWithText
                        testID={TEST_IDS.unfreeze}
                        icon={SvgIcons.SnowOffSolid}
                        text={t('actions.unfreeze')}
                        onPress={toggleCardFreeze}
                    />
                </DisplayPanel>
                <IconButtonWithText testID={TEST_IDS.limit} disabled icon={SvgIcons.DashboardSpeedSolid} text={t('actions.limits')} />
                <IconButtonWithText testID={TEST_IDS.settings} disabled icon={SvgIcons.SettingSolid} text={t('actions.settings')} />
            </View>
        </>
    );
}

const styles = StyleSheet.create(theme => ({
    container: {
        maxWidth: '100%',
        flexWrap: 'wrap',
        paddingHorizontal: theme.spacing.xl,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        gap: theme.spacing.lg,
    },
}));

const TEST_IDS = {
    viewDetails: 'view-details',
    unlockDetails: 'unlock-details',
    freeze: 'freeze',
    unfreeze: 'unfreeze',
    limit: 'limit',
    settings: 'settings',
} as const;

CardPreviewActions.TestIds = TEST_IDS;
