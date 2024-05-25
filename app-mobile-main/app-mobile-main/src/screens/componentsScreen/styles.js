import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

import {useContext} from 'react';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 5,
    },
    title: {
      color: color_primario,
      fontSize: 27,

      marginStart: 12,
      marginBottom: 20,
      paddingHorizontal: 5,
      fontWeight: 'bold',
    },
    subtitle: {
      color: color_primario,
      fontSize: 20,
      marginTop: 8,
      marginStart: 12,
      marginBottom: 10,
      paddingHorizontal: 5,
    },

    componentContainer: {
      marginBottom: 40,
    },

    color_primario,
  });
};
export default AppStyles;
