import {StyleSheet} from 'react-native';

import {useContext} from 'react';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario, color_texto} = state.cliente;

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
    searchContainer: {
      backgroundColor: '#fff',
      height: 40,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 5,
    },
    searchText: {
      textAlignVertical: 'top',
    },
    promedioContainer: {
      backgroundColor: color_primario,
      height: 40,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    promedioItems: {
      margin: 5,
      alignSelf: 'center',
    },
    promedioItemIcon: {
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#fff',
      width: 60,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    textoGeneral: {
      color: '#000',
    },
    promedioText: {
      color: color_texto,
      fontSize: 18,
      fontWeight: 'bold',
    },
    nombreCurso: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    locationIcon: {
      paddingTop: 5,
      paddingRight: 5,
      paddingLeft: 2,
    },
    aulaContainer: {
      flexDirection: 'row',
      paddingRight: 12,
    },
    periodoAula: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    color_primario,
  });
};
export default AppStyles;
