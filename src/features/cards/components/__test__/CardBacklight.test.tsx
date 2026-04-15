import { render } from '@testing-library/react-native';

import { CardDesigns } from '@cards/types';
import { CardBacklight } from '@features/cards/components/CardBacklight';

jest.mock('@features/cards/components/CardLayoutBackground', () => ({
    backgroundColorCardStyle: {
        useVariants: jest.fn(),
        background: { backgroundColor: '#000000' },
    },
}));

describe('CardBacklight', () => {
    const defaultProps = {
        cardHeight: 200,
        cardWidth: 320,
        designId: CardDesigns.Obsidian,
    };

    it('renders without crashing', () => {
        const { toJSON } = render(<CardBacklight {...defaultProps} />);

        expect(toJSON()).not.toBeNull();
    });

    it.each([
        { designId: CardDesigns.Obsidian, label: 'Obsidian (dark)' },
        { designId: CardDesigns.Arctic, label: 'Arctic (light)' },
        { designId: CardDesigns.Emerald, label: 'Emerald (dark)' },
        { designId: CardDesigns.Lavender, label: 'Lavender (light)' },
    ])('renders for $label design', ({ designId }) => {
        const { toJSON } = render(<CardBacklight {...defaultProps} designId={designId} />);

        expect(toJSON()).not.toBeNull();
    });
});
