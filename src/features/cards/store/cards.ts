import { atom } from 'jotai';

import { Card, CardStatus } from '@cards/types';
import { atomWithMMKV } from '@utils/storage/atomWithMmkv';
import { LOCAL_STORAGE_KEYS } from '@utils/storage/localStorage';

import { getMockCards } from '../mocks/getMockCards';

export const cardsAtom = atomWithMMKV(LOCAL_STORAGE_KEYS.USER_CARDS, getMockCards());

const selectedCardIdAtom = atom<string | null>(null);

export const selectedCardAtom = atom(get => {
    const id = get(selectedCardIdAtom);
    const cards = get(cardsAtom);

    const fallback = cards[0] ?? null;

    if (id) {
        return cards.find(c => c.id === id) ?? fallback;
    }

    return fallback;
});

export const selectCardAtom = atom(null, (_get, set, card: Card | null) => {
    set(selectedCardIdAtom, card?.id ?? null);
});

export const toggleCardFreezeAtom = atom(null, (get, set) => {
    const selectedCard = get(selectedCardAtom);

    if (!selectedCard || selectedCard.status === CardStatus.PENDING) {
        return;
    }

    const isFrozen = selectedCard.status === CardStatus.FROZEN;
    const allCards = get(cardsAtom);

    const updatedCards = allCards.map<Card>(c => {
        if (c.id !== selectedCard.id || c.status === CardStatus.PENDING) {
            return c;
        }

        return { ...c, status: isFrozen ? CardStatus.ACTIVE : CardStatus.FROZEN };
    });

    set(cardsAtom, updatedCards);
});
