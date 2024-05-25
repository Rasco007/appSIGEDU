import {StyleSheet} from 'react-native';
import { COLORS } from '../../constants';



  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
     
      borderRadius:25,
      backgroundColor:COLORS.white
    },
    subcontainer: {
      // Puedes ajustar el margen inferior según tus necesidades
      justifyContent: 'center',
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
      marginHorizontal:10
    },
    containerSelect: {
      marginHorizontal: 30,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: COLORS.lightGray,
      borderRadius: 20,
    },
    containerCliente: {
      paddingTop: 10,
      backgroundColor: '#fff',
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
      marginTop: 20,
      marginHorizontal: 30,
      width: '80%',
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: '100%', // Ancho del 100% del contenedor
      height: '100%',
    },
    containerFormLog: {
      flex: 1,

      justifyContent: 'center',
    },
    textLog: {
      fontSize: 35,
      color: COLORS.primary,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    textSecondaryLog: {
      fontSize: 22,
      color: COLORS.darkGray,
      textAlign: 'left',
      marginVertical: 10,
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
  });

