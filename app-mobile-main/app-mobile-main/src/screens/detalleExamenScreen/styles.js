import {StyleSheet} from 'react-native';

import {useContext} from 'react';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario, color_texto} = state.cliente;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      color: color_primario,
      fontSize: 20,
      fontWeight: 'bold',
    },
    componentsContainer: {
      borderWidth: 1,
      borderRadius: 15,
      margin: 12,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
    dato: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    texto: {
      fontSize: 18,
      textAlignVertical: 'center',
      marginStart: 15,
      color: color_texto,
    },
    proximosExamenes: {
      flex: 1,
      backgroundColor: 'white',
    },

    color_primario,
  });
};
export default AppStyles;
