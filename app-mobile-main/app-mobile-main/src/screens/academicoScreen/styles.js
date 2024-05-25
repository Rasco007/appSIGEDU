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
    },
    header: {
      marginHorizontal: 12,
    },
    title: {
      color: color_primario,
      fontSize: 27,
      marginBottom: 20,
      paddingHorizontal: 5,
      fontWeight: 'bold',
    },
    pickerSelect: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: color_primario,
    },

    color_primario,
  });
};
export default AppStyles;
