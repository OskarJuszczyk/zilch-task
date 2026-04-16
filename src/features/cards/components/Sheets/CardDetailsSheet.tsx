import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import ActionSheet, { SheetProps, useSheetPayload } from 'react-native-actions-sheet';
import { StyleSheet } from 'react-native-unistyles';

import { SheetName } from '@components/Sheets/consts';
import { Body } from '@components/Texts/Body';
import { getTestProps, TestProps } from '@utils/testing/testProps';

type OwnerCardDetails = { cardNumber: string; cardholderName: string; expiryDate: string; cvv: string };

export type CardDetailsSheetPayload = {
    details: OwnerCardDetails;
};

const TEST_IDS = {
    content: 'card-details-sheet-content',
    cardholderName: 'detail-cardholderName',
    cardNumber: 'detail-cardNumber',
    expiryDate: 'detail-expiryDate',
    cvv: 'detail-cvv',
} as const;

export function CardDetailsSheet(props: SheetProps<typeof SheetName.CardDetailsSheet>) {
    const { details } = useSheetPayload<typeof SheetName.CardDetailsSheet>();
    const { t } = useTranslation('translation', { keyPrefix: 'sheets.cardDetailsSheet' });

    return (
        <ActionSheet gestureEnabled indicatorStyle={styles.indicator} containerStyle={styles.sheetContainer} {...props.overrideProps}>
            <View {...getTestProps({ testID: TEST_IDS.content })} style={styles.content}>
                <Body variant="lg" colorSchema="neutral.strong" style={styles.title}>
                    {t('title')}
                </Body>

                <DetailRow testID={TEST_IDS.cardholderName} label={t('labels.cardholderName')} value={details.cardholderName} />
                <DetailRow testID={TEST_IDS.cardNumber} label={t('labels.cardNumber')} value={details.cardNumber} />
                <DetailRow testID={TEST_IDS.expiryDate} label={t('labels.expiryDate')} value={details.expiryDate} />
                <DetailRow testID={TEST_IDS.cvv} label={t('labels.cvv')} value={details.cvv} />
            </View>
        </ActionSheet>
    );
}

CardDetailsSheet.TestIds = TEST_IDS;

function DetailRow({ label, value, testID }: { label: string; value: string } & TestProps) {
    return (
        <View {...getTestProps({ testID })} style={styles.row}>
            <Body variant="sm" colorSchema="neutral.muted">
                {label}
            </Body>
            <Body variant="md" colorSchema="neutral.strong" selectable>
                {value}
            </Body>
        </View>
    );
}

const styles = StyleSheet.create(theme => ({
    sheetContainer: {
        backgroundColor: theme.color.surface.container,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
    },
    indicator: {
        backgroundColor: theme.border.bottomsheet.swipe.color,
        height: theme.border.bottomsheet.swipe.width,
    },
    content: {
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
        gap: theme.spacing['3Xs'],
    },
    title: {
        ...theme.text.bottomsheet.title,
        marginBottom: theme.spacing.xs,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.xs,
    },
}));
