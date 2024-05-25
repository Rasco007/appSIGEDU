import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NotificationItem from '../../components/items/notification_item';
import AppStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../components/card';
import AppStylesGral from '../../styles';
import {useFocusEffect} from '@react-navigation/native';
import { apiClient} from '../../services/api';
import axios from 'axios';

type NotProps = {
  navigation: any;
};

type NotiItemType = {
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

const NotificationScreen: React.FC<NotProps> = ({navigation}) => {
  const [notiItems, setNotiItems] = useState<NotiItemType[] | null>(null);
  const [NotiEncabezado, setNotiEncabezado] = useState<NotiEncabezadoType[]>();
  const [itemSelected, setItemSelected] = useState<boolean>(false);
  const [filterRead, setFilterRead] = useState<boolean>(false); // Nuevo estado para el filtro
  const styles = AppStyles();
  const stylesGral = AppStylesGral();

  useFocusEffect(
    React.useCallback(() => {
      fetchNotification();

      return () => {
        // Lógica de limpieza si es necesario al salir de la pantalla
      };
    }, [filterRead]), // Asegúrate de incluir el filtroRead en las dependencias
  );

  const fetchNotification = async () => {
    try {
      let responseClient = await apiClient.get('/client/notif'); //url_endpoint

      const {datos, encabezado} = responseClient.data;

      // let response = await api.get('/notif');

      // Aplicar filtro si está activo
      if (filterRead) {
        datosFiltrados = datos.filter((item: NotiItemType) => item.read);
        setNotiItems(datosFiltrados);
      } else {
        setNotiItems(datos);
        setNotiEncabezado(encabezado);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
    }
  };

  const onSelected = (item: NotiItemType) => {
    // Implementa la acción que desees al seleccionar un elemento.
  };

  const renderItem = ({item, index}: {item: NotiItemType; index: number}) => {
    return (
      <NotificationItem
        item={item}
        encabezado={NotiEncabezado}
        onSelected={() => onSelected(item)}
      />
    );
  };
  const keyExtractor = (item: NotiItemType, index: number) => index.toString();

  const handleFilterPress = () => {
    // Cambiar el estado al contrario cuando se presiona
    setItemSelected(!itemSelected);
    // Aplicar el filtro según el estado actual
    setFilterRead(!filterRead);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sub_container}>
        <Text style={styles.title}>Notificaciones</Text>
        <Card style={styles.card_filter}>
          <TouchableOpacity onPress={handleFilterPress}>
            <Icon
              name={itemSelected ? 'funnel-outline' : 'funnel'}
              size={30}
              color={stylesGral.colors.primary}
            />
          </TouchableOpacity>
        </Card>
      </View>

      {notiItems && NotiEncabezado && (
        <FlatList
          renderItem={renderItem}
          data={notiItems}
          keyExtractor={keyExtractor}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
