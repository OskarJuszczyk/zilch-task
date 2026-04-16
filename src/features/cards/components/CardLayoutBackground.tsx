import { ColorValue, View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { CardDesign, CardDesigns } from '@cards/types';

type CardLayoutBackgroundProps = {
    designId: CardDesign;
};

export function CardLayoutBackground({ designId }: CardLayoutBackgroundProps) {
    backgroundColorCardStyle.useVariants({ designId });
    return <View style={backgroundColorCardStyle.background} />;
}

export const backgroundColorCardStyle = StyleSheet.create(theme => ({
    background: {
        flex: 1,
        variants: {
            designId: {
                [CardDesigns.Oceanic]: {
                    backgroundColor: theme.color.debitcard.theme.oceanic.fill,
                },
                [CardDesigns.Arctic]: {
                    backgroundColor: theme.color.debitcard.theme.arctic.fill,
                },
                [CardDesigns.Emerald]: {
                    backgroundColor: theme.color.debitcard.theme.emerald.fill,
                },
                [CardDesigns.Graphite]: {
                    backgroundColor: theme.color.debitcard.theme.graphite.fill,
                },
                [CardDesigns.Amethyst]: {
                    backgroundColor: theme.color.debitcard.theme.amethyst.fill,
                },
                [CardDesigns.Lavender]: {
                    backgroundColor: theme.color.debitcard.theme.lavender.fill,
                },
                [CardDesigns.Lime]: {
                    backgroundColor: theme.color.debitcard.theme.lime.fill,
                },
                [CardDesigns.Aero]: {
                    backgroundColor: theme.color.debitcard.theme.aero.fill,
                },
                [CardDesigns.Obsidian]: {
                    backgroundColor: theme.color.debitcard.theme.obsidian.fill,
                },
            } satisfies Record<CardDesign, { backgroundColor: ColorValue }>,
        },
    },
}));
