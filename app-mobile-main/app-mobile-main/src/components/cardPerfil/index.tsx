import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {cardPerfil} from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AppStyles from '../../styles';
import {COLORS} from '../../constants';
import {AppContext} from '../../context/ClienteContex';

const CardPerfil: React.FC<cardPerfil> = ({
  title,
  icon,
  onSelected,
  size = 40,
  children,
}) => {
  const {state, dispatch} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;
  const styles = AppStyles();
  return (
    <View style={styles.containerViewCard}>
      <TouchableOpacity style={styles.containerCard} onPress={onSelected}>
        <View style={styles.containerIcon}>
          <Icon name={icon} size={size} color={color_primario} />
        </View>
        <Text style={styles.textCard}>{title}</Text>
        <Icon name={'angle-right'} size={20} color={color_primario} />
      </TouchableOpacity>
    </View>
  );
};

export default CardPerfil;
