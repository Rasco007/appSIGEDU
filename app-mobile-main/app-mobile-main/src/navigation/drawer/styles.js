import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppContext} from '../../context/ClienteContex';
import {COLORS} from '../../constants';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario, color_texto} = state.cliente;
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerStyles: {
      borderRadius: 15,
      marginHorizontal: 10,
      marginVertical: 3,
    },
    drawerItemContainer: {
      position: 'absolute',
      right: 15,
      top: 10,
    },
    drawerItemStyles: {
      borderRadius: 15,
      marginHorizontal: 0,
      marginVertical: 0,
      backgroundColor: COLORS.lightGraymas,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: -5,
      padding: 20,
      backgroundColor: color_primario,
      marginBottom: 20,
    },
    userInfo: {
      marginLeft: 10,
      marginTop: 5,
    },
    verPerfil: {
      fontSize: 15,
      color: 'white',
    },
    userName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: color_texto,
    },
    userEmail: {
      fontSize: 14,
    },
    userName: {
      fontSize: 20,
      color: 'white',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    menuItemText: {
      marginLeft: 20,
      fontSize: 16,
    },
    logoutButton: {
      position: 'absolute',
      right: 0,
      left: 0,
      bottom: 30,
      padding: 10,
    },
    logoutText: {
      fontSize: 15,
      marginLeft: 5,
      marginRight: 25,
      color: color_texto,
    },
    separator: {
      height: 1.5,
      backgroundColor: COLORS.lightGray,
      marginVertical: 10,
    },
    languageButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 2,
      marginBottom: 2,
    },

    languageButtonText: {
      marginLeft: 25,
      fontSize: 16,
      color: COLORS.darkGray,
    },
    modalView: {
      color: COLORS.black,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: COLORS.white, // Fondo blanco
      borderRadius: 25, // Bordes redondeados
      elevation: 4, // Elevación para la sombra en Android
      shadowColor: COLORS.black,
      shadowOpacity: 0.1,
      shadowRadius: 1.2,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    modalText: {
      marginHorizontal: 30,
      fontSize: 30,
      fontWeight: 'bold',
      padding: 2,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: COLORS.white,
      // Bordes redondeados
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      backgroundColor: COLORS.white,
      borderRadius: 10, // Bordes redondeados
      elevation: 4, // Elevación para la sombra en Android
      shadowColor: COLORS.black,
      shadowOpacity: 0.1,
      shadowRadius: 1.2,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    subMenu: {
      borderRadius: 15,
      paddingVertical: 5,
    },

    subMenus: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 20,
    },
    spacer: {
      marginVertical: 20,

      backgroundColor: COLORS.lightGray,
      alignSelf: 'center',
    },
  });
};
export default AppStyles;
