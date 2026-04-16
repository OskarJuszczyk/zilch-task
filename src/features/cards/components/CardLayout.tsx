import { PropsWithChildren, useMemo, useRef } from 'react';

import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { BlurTargetView } from 'expo-blur';

import { CardDesign, CardStatus } from '@cards/types';
import { CardBacklight } from '@features/cards/components/CardBacklight';
import { CardContent } from '@features/cards/components/CardContent';
import { CardFooter } from '@features/cards/components/CardFooter';
import { CardHeader } from '@features/cards/components/CardHeader';
import { CardLayoutBackground } from '@features/cards/components/CardLayoutBackground';
import { DefaultCardFooter } from '@features/cards/components/DefaultCardFooter';
import { DefaultCardHeader } from '@features/cards/components/DefaultCardHeader';
import { CardStatusOverlay } from '@features/cards/components/overlays/CardStatusOverlay';
import { useLayout } from '@hooks/useLayout';

const SIZE = {
    Height: 200,
    Width: 320,
};

type CardLayoutProps = PropsWithChildren<{
    BackgroundImage: React.ReactNode;
    HeaderContent: React.ReactNode;
    FooterContent: React.ReactNode;
    Content?: React.ReactNode;
    status: CardStatus;
    designId: CardDesign;
}>;

export function CardLayout({ BackgroundImage, HeaderContent, FooterContent, Content, designId, status }: CardLayoutProps) {
    const layout = useLayout();
    const blurTargetRef = useRef<View | null>(null);

    const cardWidth = layout.layout.width;
    const cardHeight = (layout.layout.width * SIZE.Height) / SIZE.Width;

    const sizeStyles = useMemo(
        () => ({
            width: cardWidth,
            height: cardHeight,
        }),
        [cardWidth, cardHeight],
    );

    return (
        <View onLayout={layout.onLayout} style={[styles.container, layout.isLayoutMeasured && sizeStyles]}>
            <View style={sizeStyles}>
                <BlurTargetView ref={blurTargetRef} style={[StyleSheet.absoluteFillObject, sizeStyles]}>
                    {designId ? <CardBacklight cardHeight={cardHeight} cardWidth={cardWidth} designId={designId} /> : null}
                    <View style={[StyleSheet.absoluteFillObject, styles.border, styles.hiddenOverflow]}>{BackgroundImage}</View>

                    <View style={[sizeStyles, styles.content]}>
                        <CardHeader>{HeaderContent}</CardHeader>
                        <CardContent>{Content}</CardContent>
                        <CardFooter>{FooterContent}</CardFooter>
                    </View>
                </BlurTargetView>

                {status ? <CardStatusOverlay status={status} blurTargetRef={blurTargetRef} /> : null}
            </View>
        </View>
    );
}

CardLayout.Sections = {
    Header: DefaultCardHeader,
    Footer: DefaultCardFooter,
};
CardLayout.Background = CardLayoutBackground;

const styles = StyleSheet.create(theme => ({
    border: {
        borderRadius: theme.borderRadius.md,
        borderWidth: theme.border.sm,
    },
    hiddenOverflow: {
        overflow: 'hidden',
    },
    container: {
        width: '100%',
        borderRadius: theme.borderRadius.md,
        borderWidth: theme.border.sm,
    },
    content: {
        backgroundColor: 'transparent',
        padding: theme.spacing.md,
        flex: 1,
    },
}));
