import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

import {useContext} from 'react';
import {AppContext} from '../../context/ClienteContex';

const AppStyles = () => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  return StyleSheet.create({
    color_primario,
  });
};
export default AppStyles;
