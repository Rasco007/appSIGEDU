import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: 10,
    marginVertical: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: COLORS.text,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    color: COLORS.primary,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'left',
    paddingVertical: 5,
    color: COLORS.primary,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '200',

    color: COLORS.text,
  },
});
