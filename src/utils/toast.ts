import { Alert } from 'react-native';

export function showToast(params: { title: string; message?: string }) {
    Alert.alert(params.title, params.message);
}
