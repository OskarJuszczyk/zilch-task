import { ICON_COLOR_SCHEMA_BY_DESIGN } from '@cards/consts';
import { CardDesigns } from '@cards/types';

describe('createComponentBasedOnCardDesign', () => {
    it.each([CardDesigns.Obsidian, CardDesigns.Emerald, CardDesigns.Graphite, CardDesigns.Amethyst, CardDesigns.Oceanic])(
        '%s maps to strong icon color',
        design => {
            expect(ICON_COLOR_SCHEMA_BY_DESIGN[design]).toBe('strong');
        },
    );

    it.each([CardDesigns.Arctic, CardDesigns.Lavender, CardDesigns.Lime, CardDesigns.Aero])('%s maps to inverted icon color', design => {
        expect(ICON_COLOR_SCHEMA_BY_DESIGN[design]).toBe('inverted');
    });

    it.each(Object.values(CardDesigns))('%s has a color schema entry', design => {
        expect(ICON_COLOR_SCHEMA_BY_DESIGN[design]).toBeDefined();
    });
});
