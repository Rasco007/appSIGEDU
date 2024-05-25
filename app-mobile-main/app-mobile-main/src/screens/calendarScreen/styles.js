import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.white,
  },
  title: {
    color: COLORS.primary,
    fontSize: 25,
    marginTop: 15,
    marginStart: 15,
    marginBottom: 15,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
});
