import React, {useState} from 'react';
import {View, Text, Image, Button} from 'react-native';
import {styles} from './styles';
import {Calendario} from '../../components/index';
import jsonData from '../../utils/api/calendario.json';
import {useFocusEffect} from '@react-navigation/native';
import {api, apiClient, apiConfigClient} from '../../services/api';
import axios from 'axios';

interface Event {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string;
}
const CalendarScreen: React.FC<Event> = () => {
  const [eventos, setEventos] = useState<Event[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchEventos();

      return () => {
        // Lógica de limpieza si es necesario al salir de la pantalla
      };
    }, []),
  );
  const fetchEventos = async () => {
    try {
      // const apiClient = axios.create(apiConfigClient);
      let responseClient = await apiClient.get('/client/calendarData'); //url_endpoint
      // const { datos, encabezado } = responseClient.data.data;
      const {eventos, estado} = responseClient.data;

      // const response = await api.get('/calendarData');

      if (estado == 'OK') {
        const eventosRecibidos: Event[] = eventos;
        setEventos(eventosRecibidos);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Pasa los datos del JSON al componente Calendario */}
      <Calendario eventos={eventos} />
    </View>
  );
};

export default CalendarScreen;
