import { SheetRegister } from 'react-native-actions-sheet';

import { CardDetailsSheet } from '@components/Sheets/CardDetailsSheet';
import { SheetName } from '@components/Sheets/consts';

export const Sheets = () => {
    return <SheetRegister sheets={{ [SheetName.CardDetailsSheet]: CardDetailsSheet }} />;
};
