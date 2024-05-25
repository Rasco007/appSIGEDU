import React, {useContext, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {COLORS} from '../../constants';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import AppStyles from '../../styles';
import {Avatar} from 'react-native-paper';
import {AppContext} from '../../context/ClienteContex';

type CustomHeaderProps = {
  navigation: any;
  route: any;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({navigation, route}) => {
  const [isMenuMotifPressed, setIsMenuNotifPressed] = useState(false);
  const [isMenuHamburPressed, setMenuHamburPressed] = useState(false);
  const {state, dispatch} = useContext(AppContext);
  const {cliente} = state;

  const stylesGral = AppStyles();
  const {title, url} = route?.params ?? {
    title: 'Dash',
    url: 'Dash',
  };

  const handleMenuHamburPress = () => {
    // Cambiar el estado al contrario cuando se presiona
    setMenuHamburPressed(!isMenuHamburPressed);

    // Abrir el menú de hamburguesas
    navigation.openDrawer();
  };

  const handleMenuNotifPress = () => {
    // Cambiar el estado al contrario cuando se presiona
    setIsMenuNotifPressed(!isMenuMotifPressed);

    // Abrir la screnn de notificaciones
    navigation.navigate('Notification');
  };

  return (
    <View style={stylesGral.headerContainer}>
      <StatusBar backgroundColor={stylesGral.headerContainer.backgroundColor} />
      <TouchableOpacity onPress={handleMenuHamburPress} style={{marginLeft: 5}}>
        <Icon name={'list-outline'} size={35} color={'#fff'} />
      </TouchableOpacity>
      {url === 'Dash' ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: `data:image/png;base64,${cliente.logo}`}}
            style={{
              width: 100,
              height: 80,
              resizeMode: 'contain', // Cambiado a 'contain'
              borderRadius: 10,
              marginTop: 10,
            }}
          />
        </View>
      ) : (
        <Text style={[styles.title_header]}>{title}</Text>
      )}
      {url === 'Dash' && (
        // TODO para habilitar la pantalla de notificaciones quitar
        // el 'disabled' y cambiar el transparent por'#fff'
        <TouchableOpacity onPress={handleMenuNotifPress} disabled>
          <Icon
            name={'notifications'}
            size={30}
            color={'transparent'} /*color={'#fff'}*/
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;
