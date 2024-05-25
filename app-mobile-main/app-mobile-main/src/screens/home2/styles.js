import {StyleSheet} from 'react-native';

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
    cardsContainer: {
      flex: 1,
      marginStart: 17,
    },
    misClases: {
      flex: 2,
      paddingRight: 12,
    },
    proximosExamenes: {
      flex: 1,
      backgroundColor: 'white',
      paddingLeft: 5,
    },
    title: {
      color: color_primario,
      fontSize: 27,
      marginStart: 12,
      marginBottom: 5,
      paddingHorizontal: 5,
      fontWeight: 'bold',
    },
    subtitle: {
      color: color_secundario,
      fontSize: 20,
      marginStart: 12,
      marginBottom: 20,
      paddingHorizontal: 5,
    },

    componentContainer: {
      marginBottom: 40,
    },

    color_primario,
  });
};
export default AppStyles;
