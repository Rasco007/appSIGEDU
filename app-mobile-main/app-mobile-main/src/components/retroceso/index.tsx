import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // Cambia 'FontAwesome' por el conjunto de iconos que prefieras
import {AppContext} from '../../context/ClienteContex';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({onPress}) => {
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{position: 'absolute', top: 40, left: 20}}>
      <Icon name="chevron-left" size={30} color={color_primario} />
    </TouchableOpacity>
  );
};

export default BackButton;
