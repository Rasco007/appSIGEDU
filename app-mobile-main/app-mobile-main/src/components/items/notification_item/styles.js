import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants';
import {useContext} from 'react';
import {AppContext} from '../../../context/ClienteContex';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  return StyleSheet.create({
    color: {
      backgroundColor: '#E7EAEE',
      primary: color_primario,
      lightPrimary: '#5C9BED',
      secondary: color_secundario,
      text: '#000000',
      black: '#000000',
      white: '#FFFFFF',
      lightGray: '#F5F5F5',
      darkGray: '#7F7F7F',
      brightRed: '#E23428',
    },
    sub_container: {
      position: 'absolute',
      width: 250,
      right: 5,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
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
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'left',
      color: color_primario,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'left',
      paddingVertical: 2,
      color: color_primario,
    },
    itemText: {
      fontSize: 15,
      fontWeight: '200',
      color: COLORS.text,
    },
    leido: {
      borderRadius: 20,
      color: 'white',
    },
    content_lectura: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      borderRadius: 20,
      gap: 5,
      paddingEnd: 8,
      paddingStart: 8,
      color: COLORS.white,
    },
    content_document: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginTop: 20,
      bottom: 5,
    },
    showtext: {
      position: 'absolute',
      right: 5,
      marginTop: 5,
      padding: 2,
      bottom: -15,
      marginBottom: 5,
      backgroundColor: COLORS.darkGray,
      borderRadius: 20,
      gap: 5,
      paddingEnd: 8,
      paddingStart: 8,
      color: COLORS.white,
    },
    showtextContainer: {
      position: 'absolute',
      right: 5,
      bottom: 0,
      borderRadius: 20,
      gap: 5,
      paddingEnd: 8,
      paddingStart: 8,
      color: COLORS.white,
    },
  });
};
export default AppStyles;
