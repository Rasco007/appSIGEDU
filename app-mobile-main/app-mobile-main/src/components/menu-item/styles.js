import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {useContext} from 'react';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  return StyleSheet.create({
    Inputcontainer: {
      backgroundColor: COLORS.white,
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '400',
      textAlign: 'left',
      paddingVertical: 2,
      color: color_primario,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 3,
    },
    cardContainer: {
      backgroundColor: COLORS.white,
      borderRadius: 15,
      padding: 8,
      margin: 4,
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      paddingVertical: 20,
    },
    iconColor: color_primario,
  });
};
export default AppStyles;
