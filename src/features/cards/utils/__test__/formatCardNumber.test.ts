import { formatCardNumber } from '@cards/utils/formatCardNumber';

describe('formatCardNumber', () => {
    it('should format card number correctly with last 4 digits', () => {
        const cardNumber = '999988******6606';
        const result = formatCardNumber(cardNumber);
        expect(result).toBe('**6606');
    });

    it('should format card number correctly with last 3 digits', () => {
        const cardNumber = '999988******6606';
        const result = formatCardNumber(cardNumber, 3, 2);
        expect(result).toBe('**606');
    });

    it('should format card number correctly with last 4 digits and mask number 1', () => {
        const cardNumber = '999988******6606';
        const result = formatCardNumber(cardNumber, 4, 1);
        expect(result).toBe('*6606');
    });
});
