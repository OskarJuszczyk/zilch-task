import { createStore } from 'jotai';

import { Card, CardDesigns, CardIconType, CardStatus, CardType } from '@cards/types';

import { cardsAtom, selectCardAtom, selectedCardAtom, toggleCardFreezeAtom } from '../cards';

const makeCard = (overrides: Partial<Card> = {}): Card =>
    ({
        id: 'card-1',
        name: 'Test Card',
        designId: CardDesigns.Obsidian,
        iconType: CardIconType.CARD,
        status: CardStatus.ACTIVE,
        maskedPan: '1234',
        expiryDate: '2030-01-01',
        type: CardType.VIRTUAL,
        issuer: 'VISA',
        cardholderName: 'Test User',
        ...overrides,
    }) as Card;

const pendingCard: Card = {
    id: 'a',
    name: 'Pending',
    designId: CardDesigns.Obsidian,
    iconType: CardIconType.CARD,
    status: CardStatus.PENDING,
    maskedPan: null,
    expiryDate: null,
    type: CardType.VIRTUAL,
    issuer: 'VISA',
    cardholderName: null,
};

describe('cards store', () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
    });

    describe('selectedCardAtom', () => {
        it('returns first card as fallback when none selected', () => {
            const cards = [makeCard({ id: 'a' }), makeCard({ id: 'b' })];
            store.set(cardsAtom, cards);

            expect(store.get(selectedCardAtom)?.id).toBe('a');
        });

        it('returns null when cards list is empty', () => {
            store.set(cardsAtom, []);

            expect(store.get(selectedCardAtom)).toBeNull();
        });

        it('returns selected card by id', () => {
            const cardB = makeCard({ id: 'b', name: 'Second' });
            const cards = [makeCard({ id: 'a' }), cardB];
            store.set(cardsAtom, cards);
            store.set(selectCardAtom, cardB);

            expect(store.get(selectedCardAtom)?.name).toBe('Second');
        });

        it('falls back to first card when selected id not found', () => {
            const cards = [makeCard({ id: 'a' }), makeCard({ id: 'b' })];
            store.set(cardsAtom, cards);
            store.set(selectCardAtom, makeCard({ id: 'nonexistent' }));

            expect(store.get(selectedCardAtom)?.id).toBe('a');
        });
    });

    describe('selectCardAtom', () => {
        it('clears selection when set to null', () => {
            const cardB = makeCard({ id: 'b' });

            const cards = [makeCard({ id: 'a' }), cardB];
            store.set(cardsAtom, cards);
            store.set(selectCardAtom, cardB);
            store.set(selectCardAtom, null);

            expect(store.get(selectedCardAtom)?.id).toBe('a');
        });
    });

    describe('toggleCardFreezeAtom', () => {
        it.each([
            { from: CardStatus.ACTIVE, to: CardStatus.FROZEN, description: 'freezes' },
            { from: CardStatus.FROZEN, to: CardStatus.ACTIVE, description: 'unfreezes' },
        ] as const)('$from card → $to ($description)', ({ from, to }) => {
            store.set(cardsAtom, [makeCard({ id: 'a', status: from })]);

            store.set(toggleCardFreezeAtom);

            expect(store.get(cardsAtom)[0]?.status).toBe(to);
        });

        it('does nothing for pending cards', () => {
            store.set(cardsAtom, [pendingCard]);

            store.set(toggleCardFreezeAtom);

            expect(store.get(cardsAtom)[0]?.status).toBe(CardStatus.PENDING);
        });

        it('only toggles selected card, leaves others unchanged', () => {
            const cardB = makeCard({ id: 'b', status: CardStatus.ACTIVE });
            const cards = [makeCard({ id: 'a', status: CardStatus.ACTIVE }), cardB];
            store.set(cardsAtom, cards);
            store.set(selectCardAtom, cardB);

            store.set(toggleCardFreezeAtom);

            const updated = store.get(cardsAtom);
            expect(updated[0]?.status).toBe(CardStatus.ACTIVE);
            expect(updated[1]?.status).toBe(CardStatus.FROZEN);
        });

        it('does nothing when no cards exist', () => {
            store.set(cardsAtom, []);

            store.set(toggleCardFreezeAtom);

            expect(store.get(cardsAtom)).toEqual([]);
        });
    });
});
