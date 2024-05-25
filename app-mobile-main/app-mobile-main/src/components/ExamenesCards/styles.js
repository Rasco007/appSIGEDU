import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;

  return StyleSheet.create({
    title: {
      color: color_texto,
      marginVertical: 10,
      fontSize: 17,
    },
    cardContainer: {
      minHeight: 100,
      minWidth: 200,
      borderWidth: 1,
      borderRadius: 10,
      marginRight: 20,
      paddingHorizontal: 12,
      paddingTop: 7,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,

      elevation: 5,
    },
    descripcion: {
      fontSize: 18,
      color: '#fff',
    },
    fecha: {
      fontSize: 12,
      marginTop: 20,
      color: '#fff',
    },
    nota: {
      fontSize: 12,
      color: '#fff',
    },
    textoGeneral: {
      color: '#000',
    },
  });
};
export default AppStyles;
