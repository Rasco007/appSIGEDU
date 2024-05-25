import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from './constants/themes/colors';
import {AppContext} from './context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  return StyleSheet.create({
    colors: {
      backgroundColor: '#E7EAEE',
      primary: color_primario,
      lightPrimary: '#5C9BED',
      secondary: color_secundario,
      text: '#000000',
      black: '#000000',
      white: '#FFFFFF',
      lightGray: '#F5F5F5',
      darkGray: '#7F7F7F',
      brightRed: '#E23428',
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 20,
    },

    containerCliente: {
      paddingTop: 10,
      backgroundColor: '#fff',
    },

    //drawer
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: -5,
      padding: 20,
      backgroundColor: color_primario,
      marginBottom: 20,
    },
    title_notification: {
      color: COLORS.primary,
      fontSize: 25,
      marginTop: 15,
      marginStart: 12,
      marginBottom: 15,
      paddingHorizontal: 5,
      fontWeight: 'bold',
    },
    title_menu: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'left',
      paddingVertical: 10,
      color: color_primario,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 75, // Ajustar la altura
      backgroundColor: color_primario,
      //   borderBottomLeftRadius:5,
      //   borderBottomRightRadius:5
    },
    cardContainer: {
      backgroundColor: '#fff096',
      borderRadius: 10,
      padding: 10,
      margin: 5,
      shadowColor: 'blue',
    },
    containerViewCard: {
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
      color: color_primario,
      fontSize: 28,
      fontWeight: 'bold',
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: color_primario,
      fontSize: 25,
      marginTop: 15,
      marginStart: 12,
      marginBottom: 15,
      paddingHorizontal: 5,
      fontWeight: 'bold',
    },
    textCard: {
      color: color_primario,
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
      marginTop: 70,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: '70%',
      aspectRatio: 1,
    },
    containerFormLog: {
      flex: 1,
      justifyContent: 'center',
    },
    textLog: {
      fontSize: 35,
      color: color_primario,
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
      color: color_primario,
      opacity: 0.7,
      textAlign: 'center',
    },
    btnLog: {
      backgroundColor: color_primario,
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
      marginTop: 15,
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
      marginHorizontal: 10,
    },
  });
};
export default AppStyles;
