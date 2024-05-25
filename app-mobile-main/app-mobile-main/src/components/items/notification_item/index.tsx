import React, {useContext, useRef, useState} from 'react';
import {TouchableOpacity, View, Text, Animated} from 'react-native';
import AppStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../card/index';
import {COLORS} from '../../../constants';
import {AppContext} from '../../../context/ClienteContex';

interface NotifItemProps {
  encabezado: NotiEncabezadoType[];
  item: NotifItemType;
  key: number;
  navigation: any;
  onSelected: (item: NotifItemType) => void;
}

type NotifItemType = {
  nroNotif: number;
  titulo: string;
  prioridad: string;
  referencia: string;
  f_notif: string;
  read: boolean;
  f_leido: string;
  body: string;
};

type NotiEncabezadoType = {
  clave: string;
  titulo: string;
  tipo: string;
  visible: boolean;
};

const NotificationItem: React.FC<NotifItemProps> = ({
  item,
  key,
  encabezado,
  navigation,
  onSelected,
}) => {
  const styles = AppStyles();
  const {state, dispatch} = useContext(AppContext);
  const {color_primario, color_secundario, color_texto} = state.cliente;

  const [showFullText, setShowFullText] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleText = () => {
    Animated.timing(fadeAnim, {
      toValue: showFullText ? 0 : 1, // Ajusta la altura máxima según sea necesario
      duration: 100, // Ajusta la duración de la animación según sea necesario
      useNativeDriver: false,
    }).start(() => {
      setShowFullText(!showFullText);
    });
  };
  const renderEncabezadoItem = (
    clave: string,
    titulo: string,
    valor: string | boolean,
  ) => {
    if (clave === 'title') {
      return (
        <View style={{width: 248}}>
          <Text style={styles.title}>{valor}</Text>
        </View>
      );
    } else if (clave === 'body') {
      return (
        <Text style={styles.subtitle}>
          {'Descripcion'}:{' '}
          <Text style={styles.itemText}>
            {showFullText ? valor : `${valor.slice(0, 68)}...`}
          </Text>
          {!showFullText && (
            <Text onPress={toggleText} style={{color: color_texto}}>
              Ver más
            </Text>
          )}
        </Text>
      );
    } else {
      return (
        <Text style={styles.subtitle}>
          {titulo}: <Text style={styles.itemText}>{valor}</Text>
        </Text>
      );
    }
  };

  return (
    <Card style={styles.bodyContainer}>
      <TouchableOpacity
        onPress={() => onSelected(item)}
        style={styles.bodyContainer}>
        <View style={{flexDirection: 'column'}}>
          {encabezado != undefined &&
            encabezado.map(config => {
              const {clave, titulo, tipo, visible} = config;
              if (visible) {
                const valor = item[clave];
                if (valor !== undefined) {
                  return renderEncabezadoItem(clave, titulo, valor);
                }
              }
              return null;
            })}
        </View>

        <View style={styles.sub_container}>
          <View
            style={[
              styles.content_lectura,
              {
                backgroundColor: item.read ? COLORS.darkGray : color_primario,
              },
            ]}>
            <Icon
              name={item.read ? 'eye' : 'eye-off'}
              size={25}
              color={COLORS.white}
            />
            <Text style={styles.leido}>
              {item.read ? ' Leída   ' : 'No Leída'}
            </Text>
          </View>
          <View style={styles.content_document}>
            <Icon
              onPress={() => console.log('hola')}
              name={'archive'}
              size={35}
              style={styles.document}
            />
          </View>
        </View>
        {/* Botón para mostrar/ocultar texto */}
        {item.body && (
          <TouchableOpacity
            onPress={toggleText}
            style={[
              styles.showtextContainer,
              {
                backgroundColor: COLORS.darkGray,
                display: showFullText ? 'flex' : 'none',
              },
            ]}>
            <Text style={styles.showtext}>{showFullText ? 'Ocultar' : ''}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Card>
  );
};

export default NotificationItem;
