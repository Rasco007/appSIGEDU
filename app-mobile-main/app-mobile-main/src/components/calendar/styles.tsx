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
      margin: 10,
      zIndex: 50,
    },
    calendar: {
      borderRadius: 10,
      elevation: 1,
      margin: 8,
      borderColor: COLORS.darkGray,
      borderWidth: 0.5,
      padding: 5,
    },
    card: {
      margin: 2,
      marginBottom: 10,
      elevation: 2,
      backgroundColor: color_primario,
    },
    cardPEvent: {
      margin: 2,
      marginTop: 10,
      padding: 10,
      marginBottom: 10,
      borderColor: color_primario,
      borderWidth: 0.5,
      borderRadius: 17,
      backgroundColor: COLORS.white,
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 0.41,
      elevation: 1,
    },
    cardTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    cardPTitle: {
      color: COLORS.darkGray,
      fontSize: 18,
      fontWeight: '500',
    },
    cardEvent: {
      color: COLORS.darkGray,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 5,
      backgroundColor: COLORS.lightGray,
      borderRadius: 20,
      padding: 5,
      marginHorizontal: 20,
    },
    cardText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: '500',
    },
    cardNextEventText: {
      textAlign: 'center',
      color: COLORS.darkGray,
      fontSize: 14,
      fontWeight: '500',
    },
    eventContainer: {
      marginBottom: 8,
    },
    separator: {
      height: 1.5,
      backgroundColor: COLORS.lightGraymas,
      marginVertical: 8,
    },
    separatorEvent: {
      height: 1,
      backgroundColor: COLORS.lightGraymas,
      marginVertical: 5,
      marginHorizontal: 10,
    },
    separatorNextEvent: {
      height: 0.8,
      backgroundColor: COLORS.lightGraymas,
      marginVertical: 10,
    },
    selectedDateContainer: {
      padding: 8,
      marginBottom: 3,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      borderRadius: 50,
      marginHorizontal: 10,
    },
    selectedDateText: {
      color: color_texto,
      fontSize: 18,
      fontWeight: 'bold',
    },
    eventsList: {
      flex: 1, // Ajusta el tamaño de acuerdo a la pantalla

      marginTop: 3,
      marginHorizontal: 13,
    },
  });
};
export default AppStyles;
