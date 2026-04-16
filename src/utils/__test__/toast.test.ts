import { Alert } from 'react-native';

import { showToast } from '@utils/toast';

describe('showToast', () => {
    it('calls Alert.alert with title and message', () => {
        const alertSpy = jest.spyOn(Alert, 'alert');

        showToast({ title: 'Error', message: 'Something failed' });

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Something failed');
    });

    it('calls Alert.alert with title only when message omitted', () => {
        const alertSpy = jest.spyOn(Alert, 'alert');

        showToast({ title: 'Done' });

        expect(alertSpy).toHaveBeenCalledWith('Done', undefined);
    });
});
