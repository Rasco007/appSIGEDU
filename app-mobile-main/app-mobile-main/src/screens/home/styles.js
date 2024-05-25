import {StyleSheet, StatusBar} from 'react-native';
import {useContext} from 'react';

import {COLORS} from '../../constants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBar.currentHeight,
  },
  separator: {
    height: 1.5,
    backgroundColor: COLORS.lightGray,
    marginVertical: 5,
  },
  container_itemMenu: {
    marginHorizontal: 15,
    margin: 5,
  },
  containerItems: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingVertical: 10,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  cardContainer: {
    backgroundColor: '#fff096',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: 'blue',
  },
  containerUser: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  userTitle: {
    fontSize: 20,
    color: COLORS.text,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 16,
  },
});
