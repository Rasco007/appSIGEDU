import React, {useContext} from 'react';
import {View, Image, TouchableOpacity, ImageSourcePropType} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {AppContext} from '../../context/ClienteContex';

interface ModalNoticiasProps {
  isVisible: boolean;
  onClose: () => void;
  url_noticia: ImageSourcePropType;
}

const ModalNoticias: React.FC<ModalNoticiasProps> = ({
  isVisible,
  onClose,
  url_noticia,
}) => {
  const {state, dispatch} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View
        style={{zIndex: 15050, alignItems: 'flex-end', marginHorizontal: -5}}>
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={1}
          style={{
            position: 'relative',
            top: 22,
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: '#fff',
            borderColor: 'black',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="xmark" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: 'black',
          padding: 5,
          borderRadius: 10,
          height: 500,
          zIndex: 15000,
        }}>
        <Image
          source={{
            uri: url_noticia,
          }}
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </View>
    </Modal>
  );
};

export default ModalNoticias;
