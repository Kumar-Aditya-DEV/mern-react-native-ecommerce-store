import { Alert, Platform } from 'react-native';

export interface AlertButton {
  text?: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export const customAlert = (
  title: string,
  message?: string,
  buttons?: AlertButton[]
): void => {
  if (Platform.OS === 'web') {
    if (!buttons || buttons.length === 0) {
      window.alert(`${title}${message ? '\n\n' + message : ''}`);
      return;
    }

    const cancelBtn = buttons.find((b) => b.style === 'cancel');
    const actionBtns = buttons.filter((b) => b.style !== 'cancel');
    const primaryBtn = actionBtns[0] || buttons[0];

    if (buttons.length === 1 || !cancelBtn) {
      window.alert(`${title}${message ? '\n\n' + message : ''}`);
      if (primaryBtn && primaryBtn.onPress) {
        primaryBtn.onPress();
      }
    } else {
      const confirmed = window.confirm(`${title}${message ? '\n\n' + message : ''}`);
      if (confirmed) {
        if (primaryBtn && primaryBtn.onPress) {
          primaryBtn.onPress();
        }
      } else {
        if (cancelBtn && cancelBtn.onPress) {
          cancelBtn.onPress();
        }
      }
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};
