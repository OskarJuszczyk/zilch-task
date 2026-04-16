import { getAllTextColors } from '@components/Texts/utils/getTextColors';
import defaultTheme from '@styles/theme';

describe('getTextColors', () => {
    it('should create color collections for default theme', () => {
        const output = getAllTextColors(defaultTheme);

        expect(output).toEqual(
            expect.objectContaining({
                'neutral.strong': { color: '#FFFFFF' },
                'neutral.default': { color: '#D5D9D4' },
                'neutral.muted': { color: '#AFB6AF' },
            }),
        );
    });
});
