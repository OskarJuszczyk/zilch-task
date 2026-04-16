import { isDefinedNonNull } from '@utils/isDefinedNonNull';

export const CardDesigns = {
    Obsidian: 'ObsidianVirtualCard',
    Emerald: 'EmeraldVirtualCard',
    Graphite: 'GraphiteVirtualCard',
    Amethyst: 'AmethystVirtualCard',
    Oceanic: 'OceanicVirtualCard',
    Arctic: 'ArcticVirtualCard',
    Lavender: 'LavenderVirtualCard',
    Lime: 'LimeVirtualCard',
    Aero: 'AeroVirtualCard',
} as const;

export const CardStatus = {
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED',
    CANCELED: 'CANCELED',
    EXPIRED: 'EXPIRED',
    FROZEN: 'FROZEN',
    INACTIVE: 'INACTIVE',
    PENDING: 'PENDING',
} as const;

export const CardType = {
    VIRTUAL: 'VIRTUAL',
    PHYSICAL: 'PHYSICAL',
} as const;

export const CardIconType = {
    CARD: 'CARD',
} as const;

export const CardIssuer = {
    MASTERCARD: 'MASTERCARD',
    VISA: 'VISA',
} as const;

export type CardStatus = RecordValues<typeof CardStatus>;
export type CardType = RecordValues<typeof CardType>;
export type CardIconType = RecordValues<typeof CardIconType>;
export type CardDesign = RecordValues<typeof CardDesigns>;
export type CardIssuer = RecordValues<typeof CardIssuer>;

type PendingCard = {
    id: string;
    name: string;
    designId: CardDesign;
    iconType: CardIconType;
    status: typeof CardStatus.PENDING;
    maskedPan: null;
    expiryDate: null;
    type: CardType;
    issuer: CardIssuer;
    cardholderName: null;
};

export type IssuedCard = {
    id: string;
    name: string;
    designId: CardDesign;
    iconType: CardIconType;
    status: Exclude<CardStatus, typeof CardStatus.PENDING>;
    maskedPan: string;
    expiryDate: string;
    type: CardType;
    issuer: CardIssuer;
    cardholderName: string;
};

export type Card = PendingCard | IssuedCard;

export type CardsResponse = Card[];

type StatusWithInfo = typeof CardStatus.PENDING | typeof CardStatus.BLOCKED | typeof CardStatus.EXPIRED;
type StatusWithActions = Exclude<CardStatus, StatusWithInfo>;

export const isStatusWithInfo = (status?: CardStatus): status is StatusWithInfo => {
    return isDefinedNonNull(status) && (status === CardStatus.PENDING || status === CardStatus.BLOCKED || status === CardStatus.EXPIRED);
};

export const isStatusWithActions = (status?: CardStatus): status is StatusWithActions => {
    return isDefinedNonNull(status) && !isStatusWithInfo(status);
};

export const isIssuedCard = (card: Card): card is IssuedCard => {
    return card.status !== CardStatus.PENDING;
};
