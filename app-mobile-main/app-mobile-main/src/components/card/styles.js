import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingVertical: 20,
  },
});
