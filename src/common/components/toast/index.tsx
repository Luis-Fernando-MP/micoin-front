import { Alert, Platform, ToastAndroid } from 'react-native';

import type { Status } from '@/common/components/shared/status';

type ToastPayload = {
  title: string;
  message?: string;
  status?: Status;
};

const showToast = ({ title, message }: ToastPayload) => {
  const body = message?.trim() ? message : undefined;

  if (Platform.OS === 'android') {
    const text = body ? `${title} · ${body}` : title;
    ToastAndroid.show(text, ToastAndroid.SHORT);
    return;
  }

  Alert.alert(title, body);
};

export { showToast };
