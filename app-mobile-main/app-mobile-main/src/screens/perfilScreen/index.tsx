import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AppStyles from '../../styles';
import {HomeProps, perfil, userData} from '../../types';
import {CardPerfil} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLORS} from '../../constants';
import {AppContext} from '../../context/ClienteContex';

const PerfilScreen: React.FC<HomeProps> = ({navigation}) => {
  const styles = AppStyles();
  const [name, setName] = useState<string>();
  const {state, dispatch} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;
  const {usuario} = state.cliente;
  const [surnames, setSurnames] = useState<string>();
  const [mail, setMail] = useState<string>();
  const handleItemPress = (item: any) => {
    navigation.navigate(item); // Navega a la pantalla correspondiente
  };

  useEffect(() => {
    const jsonPerfil: perfil = require('../../utils/api/perfil.json');
    const userActivo = jsonPerfil.userData.find(
      (userActivo: userData) => userActivo.id === '1234',
    );
    if (userActivo) {
      setName(userActivo.names);
      setSurnames(userActivo.surnames);
      setMail(userActivo.mail);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerViewCard}>
        <View style={styles.containerCard}>
          {/* <TouchableOpacity
          style={styles.containerCard}
          onPress={() => handleItemPress('Dash')}> */}
          <View style={styles.containerIcon}>
            <Icon name={'circle-user'} size={60} color={color_primario} />
          </View>
          <View>
            <Text
              style={
                styles.textCard
              }>{`${usuario?.apellido}, ${usuario?.nombre}`}</Text>
            <Text style={styles.textSecondary}>ejemplo@tdi.com</Text>
          </View>
          {/* </TouchableOpacity> */}
        </View>
      </View>

      {/* <CardPerfil
        title="Datos Personales"
        icon="id-card"
        onSelected={() => handleItemPress('Dash')}
      />
      <CardPerfil
        title="Medios de Pago"
        icon="credit-card"
        onSelected={() => handleItemPress('Dash')}
      /> */}
    </View>
  );
};

export default PerfilScreen;
