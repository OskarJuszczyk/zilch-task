const LAST_CARD_DIGITS_LENGTH = 4;

export const formatCardNumber = (cardNumber: string, lastDigitsLength: number = LAST_CARD_DIGITS_LENGTH, maskNumber: number = 2) => {
    return `${'*'.repeat(maskNumber)}${cardNumber.slice(-lastDigitsLength)}`;
};
