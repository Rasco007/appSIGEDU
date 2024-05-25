import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/themes/colors';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario, color_texto} = state.cliente;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    containerView: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    cardContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
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
    slide: {
      backgroundColor: 'white',
      paddingBottom: 0,
      marginTop: -10,
    },

    image: {
      height: 225,
      borderRadius: 8,
    },
    imageBody: {
      // borderColor:COLORS.primary,   // Color del borde
      // borderWidth: 0.7,
      // borderRadius: 7,
    },
    body: {
      padding: 5,
      textAlign: 'left',
      flexWrap: 'wrap',
      color: color_texto,
    },
    card: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 10,
      margin: 5,
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
  });
};
export default AppStyles;
