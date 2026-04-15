import { FC } from 'react';

import { withUnistyles } from 'react-native-unistyles';

import { ICON_COLOR_SCHEMA_BY_DESIGN } from '@cards/consts';
import { CardDesign } from '@cards/types';
import { ColorValue } from '@styles/unistyles';

export function createComponentBasedOnCardDesign<T extends {}>(
    Component: FC<T>,
    designId: CardDesign,
    mapPropsFn: (color: ColorValue) => Partial<T>,
) {
    return withUnistyles<FC<T>, T>(Component, theme => {
        const colorSchema = ICON_COLOR_SCHEMA_BY_DESIGN[designId];

        return mapPropsFn(theme.color.icon[colorSchema]);
    });
}
