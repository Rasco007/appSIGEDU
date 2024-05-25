import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;

  return StyleSheet.create({
    container: {
      margin: 10,
    },
    cardContainer: {
      minHeight: 120,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
      paddingLeft: 12,
      paddingTop: 7,
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
    nombreCurso: {
      color: color_texto,
      fontSize: 18,
      fontWeight: 'bold',
    },
    locationIcon: {
      position: 'absolute',
      top: 5,
      right: 5,
      margin: 2,
    },
    aulaContainer: {
      flexDirection: 'row',
      paddingRight: 12,
    },
    periodoAula: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconoVerde: {
      color: '#31b614',
    },
    iconoAmarillo: {
      color: '#F9BC00',
    },
  });
};
export default AppStyles;
