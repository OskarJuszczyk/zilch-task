import { useCallback } from 'react';

import { ListRenderItemInfo, View } from 'react-native';

import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';

import { Card } from '@cards/types';
import { DisplayCardDesign } from '@features/cards/components/DisplayCardDesign';
import { useCardListDimensions } from '@features/cards/hooks/useCardListDimensions';
import { getTestProps } from '@utils/testing/testProps';

type CardPreviewListProps = {
    data: Card[];
    initialIndex: number;
    onScrollEnd: (newIndex: number) => void;
};

const keyExtractor = (item: Card) => item.id;
const INIT_NUM_TO_RENDER = 4;

const TEST_IDS = {
    list: 'card-preview-list',
    item: (cardId: string) => `card-item-${cardId}` as const,
} as const;

export function CardPreviewList({ data, initialIndex, onScrollEnd }: CardPreviewListProps) {
    const { cardWidth, interval } = useCardListDimensions();

    const currentIndex = useSharedValue(initialIndex);

    const scrollHandler = useAnimatedScrollHandler(event => {
        const newIndex = Math.round(event.contentOffset.x / interval);
        if (newIndex !== currentIndex.value) {
            currentIndex.value = newIndex;
            scheduleOnRN(onScrollEnd, newIndex);
        }
    });

    const initialScrollIndex = Math.max(0, initialIndex);

    const getItemLayout = useCallback(
        (_data: unknown, index: number) => {
            return { length: cardWidth, offset: index * interval, index };
        },
        [cardWidth, interval],
    );

    const renderItem = useCallback(({ item }: ListRenderItemInfo<Card>) => <CardItem card={item} width={cardWidth} />, [cardWidth]);

    return (
        <Animated.FlatList
            {...getTestProps({ testID: TEST_IDS.list })}
            data={data}
            contentContainerStyle={styles.content}
            style={styles.list}
            initialScrollIndex={initialScrollIndex}
            initialNumToRender={INIT_NUM_TO_RENDER}
            getItemLayout={getItemLayout}
            horizontal
            onScroll={scrollHandler}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            snapToInterval={interval}
            scrollEventThrottle={16}
            decelerationRate="fast"
            renderItem={renderItem}
        />
    );
}

CardPreviewList.TestIds = TEST_IDS;

function CardItem({ card, width }: { card: Card; width: number }) {
    return (
        <View {...getTestProps({ testID: TEST_IDS.item(card.id) })} style={{ width }}>
            <DisplayCardDesign card={card} />
        </View>
    );
}

const styles = StyleSheet.create(theme => ({
    content: {
        gap: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing['12Xl'],
    },
    list: {
        flexGrow: 0,
    },
}));
