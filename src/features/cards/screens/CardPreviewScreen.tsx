import { useCallback, useRef } from 'react';

import { StyleSheet } from 'react-native-unistyles';

import { useAtomValue, useSetAtom } from 'jotai';

import { CardInfoBanner } from '@cards/components/CardInfoBanner';
import { ENTERING_ANIMATION, EXITING_ANIMATION } from '@cards/consts';
import { cardsAtom, selectCardAtom, selectedCardAtom } from '@cards/store/cards';
import { isStatusWithActions, isStatusWithInfo } from '@cards/types';
import { ScreenContainer } from '@components/Layouts/ScreenContainer';
import DisplayPanel from '@components/Panels/DisplayPanel';
import { CardPreviewActions } from '@features/cards/components/CardPreviewActions';
import { CardPreviewList } from '@features/cards/components/CardPreviewList';

export function CardPreviewScreen() {
    const cardsList = useAtomValue(cardsAtom);

    const selectedCard = useAtomValue(selectedCardAtom);
    const selectCard = useSetAtom(selectCardAtom);
    const initialIndex = useRef(selectedCard ? cardsList.findIndex(c => c.id === selectedCard.id) : 0);

    const onScrollEnd = useCallback(
        (newIndex: number) => {
            const card = cardsList[newIndex];
            if (card) {
                selectCard(card);
            }
        },
        [selectCard, cardsList],
    );

    const selectedCardStatus = selectedCard?.status;

    const showInfoBanner = isStatusWithInfo(selectedCardStatus);
    const showActions = isStatusWithActions(selectedCardStatus);

    const showCardInfo = !!selectedCard && !!selectedCardStatus;

    return (
        <ScreenContainer style={styles.container}>
            <CardPreviewList data={cardsList} initialIndex={initialIndex.current} onScrollEnd={onScrollEnd} />

            {showCardInfo && (
                <>
                    <DisplayPanel
                        withFade
                        animateOnMount={false}
                        shouldDisplayContent={showInfoBanner}
                        enteringAnimation={ENTERING_ANIMATION}
                        exitingAnimation={EXITING_ANIMATION}>
                        <CardInfoBanner status={selectedCardStatus} />
                    </DisplayPanel>
                    <DisplayPanel
                        withFade
                        animateOnMount={false}
                        shouldDisplayContent={showActions}
                        enteringAnimation={ENTERING_ANIMATION}
                        exitingAnimation={EXITING_ANIMATION}>
                        <CardPreviewActions card={selectedCard} />
                    </DisplayPanel>
                </>
            )}
        </ScreenContainer>
    );
}

const styles = StyleSheet.create(theme => ({
    container: {
        paddingTop: theme.spacing.md,
    },
}));
