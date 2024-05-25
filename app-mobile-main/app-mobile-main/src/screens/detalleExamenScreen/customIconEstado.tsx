import React, {useContext} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import AppStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const IconoEstado = ({estado}: {estado: string}) => {
  const styles = AppStyles();
  let icono;
  let texto_estado;
  if (estado === 'APRB') {
    icono = 'checkmark-circle';
    texto_estado = 'Aprobado';
  } else {
    icono = 'warning';
    texto_estado = 'Desaprobado';
  }
  return (
    <View style={styles.dato}>
      <Icon name={icono} size={20} color={styles.color_primario} />
      <Text style={styles.texto}>{texto_estado}</Text>
    </View>
  );
};

export default IconoEstado;
