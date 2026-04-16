import { SheetDefinition } from 'react-native-actions-sheet';

import { CardDetailsSheetPayload } from '@cards/components/Sheets/CardDetailsSheet';

export const SheetName = {
    CardDetailsSheet: 'card-details-sheet',
} as const;

declare module 'react-native-actions-sheet' {
    interface Sheets {
        'card-details-sheet': SheetDefinition<{
            payload: CardDetailsSheetPayload;
        }>;
    }
}
