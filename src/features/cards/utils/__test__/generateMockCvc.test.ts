import { generateMockCvc } from '@cards/utils/generateMockCvc';

describe('generateMockCvc', () => {
    it('returns a 3-character string', () => {
        const cvc = generateMockCvc();

        expect(cvc).toHaveLength(3);
    });

    it('returns only digits', () => {
        const cvc = generateMockCvc();

        expect(cvc).toMatch(/^\d{3}$/);
    });

    it('pads with leading zeros when random value is small', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0);

        expect(generateMockCvc()).toBe('000');

        jest.spyOn(Math, 'random').mockRestore();
    });

    it('returns max value 999', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.999999);

        expect(generateMockCvc()).toBe('999');

        jest.spyOn(Math, 'random').mockRestore();
    });
});
