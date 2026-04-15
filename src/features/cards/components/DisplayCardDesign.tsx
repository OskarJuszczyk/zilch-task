import { Card } from '@cards/types';
import { formatCardNumber } from '@cards/utils/formatCardNumber';
import { CardLayout } from '@features/cards/components/CardLayout';
import { isDefinedNonNull } from '@utils/isDefinedNonNull';

type DisplayCardDesignProps = {
    card: Card;
};

export function DisplayCardDesign({ card }: DisplayCardDesignProps) {
    const { designId, type, name, maskedPan, status, issuer, cardholderName } = card;

    const formattedMaskedPan = isDefinedNonNull(maskedPan) ? formatCardNumber(maskedPan) : undefined;

    return (
        <CardLayout
            BackgroundImage={<CardLayout.Background designId={designId} />}
            HeaderContent={<CardLayout.Sections.Header type={type} designId={designId} />}
            FooterContent={
                <CardLayout.Sections.Footer
                    issuer={issuer}
                    designId={designId}
                    cardName={name}
                    maskedPan={formattedMaskedPan}
                    cardholderName={cardholderName}
                />
            }
            status={status}
            designId={designId}
        />
    );
}
