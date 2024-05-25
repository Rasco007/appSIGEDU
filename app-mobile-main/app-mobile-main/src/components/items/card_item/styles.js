import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';
import {AppContext} from '../../../context/ClienteContex';

const {state} = useContext(AppContext);
const {color_texto} = state.cliente;

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'column', // Para que los elementos estén en la misma fila
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    // Para alinear verticalmente en el centro
  },
  textContainer: {},
  text: {
    color: color_texto,
    marginBottom: 8,
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
