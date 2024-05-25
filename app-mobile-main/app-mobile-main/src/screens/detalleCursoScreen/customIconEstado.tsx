import React, {useContext} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import AppStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const IconoEstado = ({estado}: {estado: string}) => {
  const styles = AppStyles();
  let icono;
  if (estado === 'Regular') {
    icono = 'checkmark-circle'; // Icono para el estado activo
  } else {
    icono = 'warning'; // Icono para cualquier otro estado
  }
  return (
    <View style={styles.dato}>
      <Icon name={icono} size={20} color={styles.color_primario} />
      <Text style={styles.texto}>{estado}</Text>
    </View>
  );
};

export default IconoEstado;
