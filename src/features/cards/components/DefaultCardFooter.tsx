import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { SECONDARY_TEXT_COLOR_SCHEMA_BY_DESIGN, TEXT_COLOR_SCHEMA_BY_DESIGN } from '@cards/consts';
import { CardDesign, CardIssuer } from '@cards/types';
import { createComponentBasedOnCardDesign } from '@cards/utils/createComponentBasedOnCardDesign';
import { Body } from '@components/Texts/Body';
import { Subtitle } from '@components/Texts/Subtitle';
import { MasterCardLogo } from '@features/cards/assets/MasterCardLogo';
import { VisaLogo } from '@features/cards/assets/VisaLogo';
import { isDefinedNonNull } from '@utils/isDefinedNonNull';

type DefaultCardFooterProps = {
    issuer: CardIssuer;
    cardName: string;
    designId: CardDesign;
    maskedPan?: WithUndefined<string>;
    cardholderName?: WithNull<string>;
};

export function DefaultCardFooter({ issuer, cardName, designId, maskedPan, cardholderName }: DefaultCardFooterProps) {
    const LogoComponent = createComponentBasedOnCardDesign(issuer === CardIssuer.VISA ? VisaLogo : MasterCardLogo, designId, fill => ({ fill }));
    const textColorSchema = TEXT_COLOR_SCHEMA_BY_DESIGN[designId];
    const secondaryTextColorSchema = SECONDARY_TEXT_COLOR_SCHEMA_BY_DESIGN[designId];

    return (
        <>
            <View style={styles.leftColumn}>
                {isDefinedNonNull(cardholderName) ? (
                    <Body variant="md" colorSchema={secondaryTextColorSchema} numberOfLines={1}>
                        {cardholderName}
                    </Body>
                ) : null}

                <Subtitle variant="md" colorSchema={textColorSchema} numberOfLines={1}>
                    {cardName}
                </Subtitle>

                {isDefinedNonNull(maskedPan) ? (
                    <Body variant="md" colorSchema={secondaryTextColorSchema} numberOfLines={1}>
                        {maskedPan}
                    </Body>
                ) : null}
            </View>

            <LogoComponent />
        </>
    );
}

const styles = StyleSheet.create(() => ({
    leftColumn: {
        flexShrink: 1,
        flexDirection: 'column',
    },
}));
