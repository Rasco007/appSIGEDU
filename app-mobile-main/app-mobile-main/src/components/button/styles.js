import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants';
export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
