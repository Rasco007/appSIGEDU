import React, {useContext} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';
import {useTranslation} from 'react-i18next';
import AppStyles from './styles';
import {AppContext} from '../../context/ClienteContex';

interface ClaseHoy {
  nombreCurso: string;
  docente: string;
  horario: string;
  sede: string;
  aula: string;
  n_id_alu_cur: number;
}

interface MisClasesHoyCardsProps {
  data: ClaseHoy[];
  navigation: any;
  route: any;
  titulo: string;
}

const MisClasesHoyCards: React.FC<MisClasesHoyCardsProps> = ({
  data,
  navigation,
  route,
  titulo,
}) => {
  const styles = AppStyles();
  const {t} = useTranslation();

  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;

  const onPressCard = (valor: number) => {
    navigation.navigate('DetalleCursoScreen', {
      title: 'Detalle de Curso',
      id_alu_cur: valor,
    });
  };

  const renderItemClasesHoy = ({item}: {item: ClaseHoy}) => {
    return (
      <TouchableOpacity
        key={item.nombreCurso + item.docente}
        onPress={() => onPressCard(item.n_id_alu_cur)}
        style={styles.cardContainer}>
        <Text style={styles.nombreCurso}>{item.nombreCurso}</Text>
        <Text style={{color: color_texto}}>
          {t('home.profesor/a')}: {item.docente}
        </Text>
        <View style={styles.dato}>
          <Icon
            name="clock"
            size={13}
            style={{...styles.icon, ...styles.clockIcon}}
          />
          <Text style={{color: color_texto}}>{item.horario}</Text>
        </View>

        <View style={styles.dato}>
          <Icon
            name="location-dot"
            size={13}
            style={{...styles.icon, ...styles.locationIcon}}
          />
          <Text style={{color: color_texto}}>{item.sede}</Text>
        </View>

        <View style={styles.dato}>
          <Icon name="door-closed" size={13} style={styles.icon} />
          <Text style={{color: color_texto}}>{item.aula}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItemClasesHoy}
          keyExtractor={(item: ClaseHoy) =>
            `${item.nombreCurso}${item.horario}`
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={{color: color_texto}}>{t('home.noClasesHoy')}</Text>
      )}
    </View>
  );
};

export default MisClasesHoyCards;
