import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
