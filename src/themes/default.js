import {DefaultTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export const bottomTabTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: 'rgba(255, 255, 255, 0.5)',
    secondaryContainer: 'transparent',
  },
}
