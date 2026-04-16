import { Card, CardDesigns, CardIconType, CardStatus, CardType, isIssuedCard, isStatusWithActions, isStatusWithInfo } from '@cards/types';

describe('isStatusWithInfo', () => {
    it.each([CardStatus.PENDING, CardStatus.BLOCKED, CardStatus.EXPIRED])('%s → true', status => {
        expect(isStatusWithInfo(status)).toBeTrue();
    });

    it.each([CardStatus.ACTIVE, CardStatus.FROZEN, CardStatus.INACTIVE, CardStatus.CANCELED])('%s → false', status => {
        expect(isStatusWithInfo(status)).toBeFalse();
    });

    it.each([undefined, null])('%s → false', value => {
        expect(isStatusWithInfo(value as undefined)).toBeFalse();
    });
});

describe('isStatusWithActions', () => {
    it.each([CardStatus.ACTIVE, CardStatus.FROZEN, CardStatus.INACTIVE, CardStatus.CANCELED])('%s → true', status => {
        expect(isStatusWithActions(status)).toBeTrue();
    });

    it.each([CardStatus.PENDING, CardStatus.BLOCKED, CardStatus.EXPIRED])('%s → false', status => {
        expect(isStatusWithActions(status)).toBeFalse();
    });

    it.each([undefined, null])('%s → false', value => {
        expect(isStatusWithActions(value as undefined)).toBeFalse();
    });
});

describe('isIssuedCard', () => {
    const makeCard = (status: CardStatus): Card =>
        ({
            id: 'card-1',
            name: 'Test',
            designId: CardDesigns.Obsidian,
            iconType: CardIconType.CARD,
            status,
            maskedPan: status === CardStatus.PENDING ? null : '1234',
            expiryDate: status === CardStatus.PENDING ? null : '2030-01-01',
            type: CardType.VIRTUAL,
            issuer: 'VISA',
            cardholderName: status === CardStatus.PENDING ? null : 'Test User',
        }) as Card;

    it.each([CardStatus.ACTIVE, CardStatus.FROZEN, CardStatus.BLOCKED, CardStatus.EXPIRED, CardStatus.INACTIVE, CardStatus.CANCELED])(
        '%s → true (issued)',
        status => {
            expect(isIssuedCard(makeCard(status))).toBeTrue();
        },
    );

    it('PENDING → false (not issued)', () => {
        expect(isIssuedCard(makeCard(CardStatus.PENDING))).toBeFalse();
    });
});
