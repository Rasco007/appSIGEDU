import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/themes/colors';
import {useContext} from 'react';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  return StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: COLORS.white,
      // Puedes ajustar el margen inferior según tus necesidades

      borderRadius: 8, // Bordes redondeados
      // elevation: 2, // Elevación para la sombra en Android
      // shadowColor: COLORS.black,
      // shadowOpacity: 0.2,
      // shadowRadius: 0.41,
      // shadowOffset: {
      //   width: 0,
      //   height: 0,
      // },
    },
    subcontainer: {
      marginHorizontal: 15,
      paddingTop: 100,
    },
    containerCliente: {
      paddingTop: 5,
      backgroundColor: '#fff',
    },
    containerScroll: {
      flexGrow: 1.2,
      marginTop: 5,
      paddingHorizontal: 5,
      paddingTop: 5,
      // Ajusta el espacio inferior según tus necesidades
    },
    cardContainer: {
      backgroundColor: '#fff096',
      borderRadius: 10,
      padding: 10,
      margin: 5,
      shadowColor: 'blue',
    },
    containerViewCard: {
      width: '100%',
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      paddingVertical: 10,
      padding: 10,
      margin: 5,
      borderRadius: 10,
      backgroundColor: COLORS.white,
    },
    containerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      marginHorizontal: 10,
    },
    containerIcon: {
      width: '25%',
    },
    textContainer: {
      color: COLORS.primary,
      fontSize: 28,
      fontWeight: 'bold',
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textCard: {
      color: COLORS.primary,
      fontSize: 20,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textSecondary: {
      color: COLORS.darkGray,
      fontSize: 14,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerLogo: {
      width: 'auto',
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      paddingTop: 15,
    },
    logo: {
      width: '100%', // Ancho del 100% del contenedor
      height: '100%',
    },
    containerFormLog: {},
    textLog: {
      fontSize: 25,
      color: color_primario,
      fontWeight: 'bold',
      marginTop: 15,
      textAlign: 'left',
    },
    textSecondaryLog: {
      fontSize: 21,
      marginTop: 5,
      color: COLORS.darkGray,
      textAlign: 'left',
      marginBottom: 2,
    },
    inputLog: {
      width: '100%',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      paddingVertical: 10,
      padding: 10,
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    iconContainer: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: [{translateY: -10}],
    },
    containerRecuperaLog: {
      marginTop: 10,
      marginBottom: 60,
    },
    textRecuperaLog: {
      color: COLORS.primary,
      opacity: 0.7,
      textAlign: 'center',
    },
    btnLog: {
      backgroundColor: COLORS.primary,
      opacity: 0.5,
      borderRadius: 10,
      marginBottom: 20,
    },
    textBtnLog: {
      fontSize: 22,
      textAlign: 'center',
      color: COLORS.white,
      opacity: 1,
      margin: 10,
    },
    calendar: {
      margin: 2,
      borderRadius: 10,
      elevation: 4,
      marginBottom: 10,
      paddingBottom: 5,
    },
    card: {
      margin: 2,
      marginBottom: 10,
      elevation: 4,
      backgroundColor: COLORS.lightPrimary,
    },
    cardTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    cardText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: '500',
    },
    eventsList: {
      flex: 1, // Ajusta el tamaño de acuerdo a la pantalla
      marginBottom: 1,
    },
    containerSelect: {
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: COLORS.lightGray,
      borderRadius: 20,
    },
    modalheader: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      color: COLORS.black,
      justifyContent: 'center',

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
  });
};
export default AppStyles;
