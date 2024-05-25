import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/themes/colors';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 5,
    },
    sub_container: {
      flexDirection: 'row',
      alignItems: 'center',

      justifyContent: 'space-between',
    },
    cardContainer: {
      backgroundColor: '#fff096',
      borderRadius: 10,
      padding: 10,
      margin: 5,
      shadowColor: 'blue',
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
    card_filter: {
      paddingEnd: 15,
      paddingStart: 15,
    },
  });
};
export default AppStyles;
