import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { BLUR_RATIO_BY_DESIGN } from '@cards/consts';
import { CardDesign } from '@cards/types';
import { backgroundColorCardStyle } from '@features/cards/components/CardLayoutBackground';
import { Blur, Canvas, Oval } from '@shopify/react-native-skia';

type CardBacklightProps = {
    cardHeight: number;
    cardWidth: number;
    designId: CardDesign;
};

const BLUR_AMOUNT = 40;

export function CardBacklight({ cardHeight, cardWidth, designId }: CardBacklightProps) {
    const BlurRatio = BLUR_RATIO_BY_DESIGN[designId];
    const blurHeight = cardHeight / BlurRatio.height;
    const blurWidth = cardWidth / BlurRatio.width;

    const blurXStart = (cardWidth - blurWidth) / 2;
    const blurYStart = (cardHeight - blurHeight) / 2;

    backgroundColorCardStyle.useVariants({ designId });
    const color = backgroundColorCardStyle.background.backgroundColor;

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <Canvas
                style={[
                    { marginTop: -cardHeight, marginBottom: -cardHeight, marginLeft: -cardWidth, marginRight: -cardWidth },
                    StyleSheet.absoluteFillObject,
                ]}>
                <Oval x={blurXStart + cardWidth} y={blurYStart + cardHeight} width={blurWidth} height={blurHeight} color={color}>
                    <Blur blur={BLUR_AMOUNT} />
                </Oval>
            </Canvas>
        </View>
    );
}
