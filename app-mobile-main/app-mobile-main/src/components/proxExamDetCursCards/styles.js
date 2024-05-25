import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;

  return StyleSheet.create({
    title: {
      marginVertical: 10,
      fontSize: 17,
      color: color_texto,
    },
    cardContainer: {
      height: 100,
      minWidth: 200,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#898989',
      marginRight: 20,
      paddingHorizontal: 12,
      paddingTop: 7,

      backgroundColor: '#898989',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,

      elevation: 5,
    },
    instancia: {
      fontSize: 18,
      color: '#fff',
    },
    fecha: {
      fontSize: 12,
      color: '#fff',
    },
    aula: {
      fontSize: 12,
      color: '#fff',
      marginTop: 12,
    },
    horario: {
      fontSize: 12,
      color: '#fff',
    },
  });
};
export default AppStyles;
