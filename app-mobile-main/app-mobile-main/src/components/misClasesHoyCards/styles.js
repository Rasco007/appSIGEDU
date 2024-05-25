import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;

  return StyleSheet.create({
    container: {
      padding: 5,
      marginBottom: 30,
      backgroundColor: '#fff',
    },
    title: {
      marginBottom: 10,
      fontSize: 17,
      color: color_texto,
    },
    cardContainer: {
      minHeight: 120,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
      paddingLeft: 12,
      paddingTop: 7,
      paddingBottom: 12,
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
      fontSize: 18,
      fontWeight: 'bold',
      color: color_texto,
    },
    dato: {
      flexDirection: 'row',
    },
    icon: {
      paddingTop: 5,
      paddingRight: 5,
      color: color_texto,
    },
    clockIcon: {
      paddingLeft: 1,
    },
    locationIcon: {
      paddingLeft: 2,
    },
  });
};
export default AppStyles;
