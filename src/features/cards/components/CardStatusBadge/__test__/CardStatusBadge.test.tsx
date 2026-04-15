import { CardStatusBadge } from '@features/cards/components/CardStatusBadge/CardStatusBadge';
import { CardStatus } from '@cards/types';
import { render, screen } from '@testing-library/react-native';

describe('CardStatusBadge', () => {
    it('renders blocked badge with label for BLOCKED status', () => {
        render(<CardStatusBadge status={CardStatus.BLOCKED} />);
        expect(screen.getByText(CardStatus.BLOCKED)).toBeVisible();
    });

    it('renders frozen badge with label for FROZEN status', () => {
        render(<CardStatusBadge status={CardStatus.FROZEN} />);
        expect(screen.getByText(CardStatus.FROZEN)).toBeVisible();
    });

    it('renders pending badge with label for PENDING status', () => {
        render(<CardStatusBadge status={CardStatus.PENDING} />);
        expect(screen.getByText(CardStatus.PENDING)).toBeVisible();
    });
});
