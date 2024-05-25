import React, {useState, useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Card from '../card';
import {useContext} from 'react';
import {AppContext} from '../../context/ClienteContex';
import AppStyles from './styles';
import BottomSheetScrollView, {BottomSheetMethods} from '../bottom-sheet';
// import ModalSheet, { BottomSheetRefProps } from '../../components/modal-sheet/index';
import {COLORS} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
// import  BottomSheetRefProps  from '../bottom-sheet';
import ModalSheet, {BottomSheetRefProps} from '../modal-sheet';
import {todayString} from 'react-native-calendars/src/expandableCalendar/commons';
import {api} from '../../services/api';
import {useFocusEffect} from '@react-navigation/native';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

interface Event {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string;
}

interface CalendarioProps {
  eventos: Event[];
}

const Calendario: React.FC<CalendarioProps> = ({eventos}) => {
  const styles = AppStyles();
  console.log(eventos, 'eventos');
  const Separator: React.FC<{style?: any}> = ({style}) => (
    <View style={[styles.separator, style]} />
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const bottomSheetRef = useRef<BottomSheetMethods>(null); // Ref for BottomSheetScrollView
  const [ModalSheetRef, setModalSheetRef] =
    useState<BottomSheetRefProps | null>(null); //para modal-sheet
  const {state} = useContext(AppContext);
  const {color_primario, color_secundario} = state.cliente;

  const handleDatePress = (day: {dateString: string}) => {
    const selectedEventsForDate = eventos.filter(
      event => event.fecha.substring(0, 10) === day.dateString,
    );
    console.log(day, 'day');
    if (selectedEventsForDate.length > 0) {
      setSelectedDate(day.dateString);
      setSelectedEvents(selectedEventsForDate);
      bottomSheetRef.current?.expand(); // Expand the BottomSheetScrollView
      ModalSheetRef?.scrollTo(-435);
    } else {
      ModalSheetRef?.scrollTo(0); // otro modal sheet
      setSelectedDate(day.dateString);
      setSelectedEvents([]);
      bottomSheetRef.current?.close(); // Close the BottomSheetScrollView
    }
  };

  const handleNextEventPress = (eventId: string, eventDate: string) => {
    const selectedEvent = eventos.find(event => event.id === eventId);
    if (selectedEvent) {
      setSelectedEvents([selectedEvent]);
      setSelectedDate(eventDate);
      bottomSheetRef.current?.expand(); // Expand the BottomSheetScrollView
      ModalSheetRef?.scrollTo(-435);
    }
  };

  let markedDates;
  if (eventos != undefined) {
    markedDates = eventos.reduce((acc, event) => {
      const dateWithoutTime: string = event.fecha.substring(0, 10);
      const isSelected = selectedDate === dateWithoutTime;

      acc[dateWithoutTime] = {
        selected: isSelected,
        marked: true,
        dotColor: isSelected ? 'white' : color_primario,
        selectedColor: isSelected ? color_primario : COLORS.lightGray,
      };

      return acc;
    }, {} as {[key: string]: any});
  }

  const formatSelectedDate = (date: string, tipo: string) => {
    if (tipo === 'MED') {
      const options: any = {weekday: 'long', day: 'numeric'};
      const dateObject = new Date(date + 'T00:00:00-03:00'); // Ajustar a la zona horaria de Buenos Aires (UTC-3:00)
      const formattedDate = new Intl.DateTimeFormat('es-AR', options)
        .format(dateObject)
        .toUpperCase();
      return formattedDate;
    }
    if (tipo === 'COM') {
      const options: any = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      const dateObject = new Date(date + 'T00:00:00-03:00'); // Ajustar a la zona horaria de Buenos Aires (UTC-3:00)
      const formattedDate = new Intl.DateTimeFormat('es-AR', options)
        .format(dateObject)
        .toUpperCase();
      return formattedDate;
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let obtenerEventosProximosDias;
  if (eventos != undefined) {
    obtenerEventosProximosDias = eventos.filter(event => {
      const eventDate = new Date(event.fecha);
      return (
        eventDate >= today &&
        eventDate <= new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)
      );
    });
  }

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        onDayPress={handleDatePress}
        markedDates={markedDates}
        theme={{
          calendarBackground: 'white',
          textSectionTitleColor: 'black',
          dayTextColor: 'black',
          todayTextColor: color_primario,
          monthTextColor: 'black',
          arrowColor: color_primario,
        }}
      />

      {/* <BottomSheetScrollView
        ref={bottomSheetRef}
        snapTo="60%"
        backgroundColor="white"
        backDropColor="rgba(0,0,0,0.5)"
      >
        <View style={styles.selectedDateContainer}>
          {selectedDate && (
            <Text style={styles.selectedDateText}>
              {formatSelectedDate(selectedDate)}
            </Text>
          )}
        </View>
        <Separator style={styles.separator} />

        <View style={styles.eventsList}>
          {selectedEvents.map((event, index) => (
            <Card key={index} style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>{event.titulo.toUpperCase()}</Text>
                <Text style={styles.cardText}>{event.descripcion}</Text>
              </View>
            </Card>
          ))}
        </View>
      </BottomSheetScrollView> */}
      <ModalSheet ref={setModalSheetRef}>
        <View style={styles.selectedDateContainer}>
          {selectedDate && (
            <Text style={styles.selectedDateText}>
              {formatSelectedDate(selectedDate, 'MED')}
            </Text>
          )}
        </View>
        <Separator style={styles.separator} />

        <View style={styles.eventsList}>
          {selectedEvents.map((event, index) => (
            <Card key={index} style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>
                  {event.titulo.toUpperCase()}
                </Text>
                <Text style={styles.cardText}>{event.descripcion}</Text>
              </View>
            </Card>
          ))}
        </View>
      </ModalSheet>

      <View style={styles.container}>
        <Text style={styles.cardEvent}> Eventos Próximos </Text>
        <Separator style={styles.separatorEvent} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {obtenerEventosProximosDias != undefined &&
            obtenerEventosProximosDias.map((event, index) => (
              <TouchableOpacity
                style={styles.cardPEvent}
                onPress={() =>
                  handleNextEventPress(event.id, event.fecha.substring(0, 10))
                }
                key={index}>
                <View>
                  <Text style={styles.cardNextEventText}>
                    {formatSelectedDate(
                      new Date(event.fecha).toISOString().split('T')[0],
                      'COM',
                    )}
                    {/* {new Date(event.fecha.substring(0, 10)).toLocaleDateString('es-ES', {
                    weekday: 'long', timeZone: 'America/Argentina/Buenos_Aires' 
                  }).toUpperCase()} */}
                  </Text>
                  <Separator style={styles.separatorNextEvent} />
                  <Text style={styles.cardPTitle}>
                    <Icon
                      name={'caret-forward'}
                      size={13}
                      color={color_primario}
                    />{' '}
                    {event.titulo.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Calendario;
