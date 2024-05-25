import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/themes/colors';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  return StyleSheet.create({
    slide: {
      backgroundColor: 'white',
      borderRadius: 8,
      borderColor: color_primario, // Color del borde
      borderWidth: 1,
      elevation: 2,
    },
    container: {
      paddingBottom: 50,
    },

    containerItems: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      marginHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      padding: 5,
    },
    image: {
      width: '100%',
      height: 225,
      borderRadius: 8,
    },
    imageBody: {
      borderColor: color_primario, // Color del borde
      borderWidth: 0.7,
      borderRadius: 7,
    },
    body: {
      padding: 10,
      textAlign: 'left',
    },
    dot: {
      height: 10,
      borderRadius: 5,
      backgroundColor: color_primario,
      marginHorizontal: 8,
    },
  });
};
export default AppStyles;
