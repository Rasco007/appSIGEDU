import React from 'react';
import {FlatList, Text, Touchable, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import AppStyles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Examenes {
  id_libreta: string;
  instancia: string;
  nota: number;
  fecha: string;
}

interface ExamenesCardsProps {
  data: Examenes[];
  navigation: any;
  nombreCurso: string;
}

const ExamenesCards: React.FC<ExamenesCardsProps> = ({
  data,
  navigation,
  nombreCurso,
}) => {
  const styles = AppStyles();
  const {t} = useTranslation();

  const onPressCard = (valor: string) => {
    navigation.navigate('DetalleExamenScreen', {
      title: 'Detalle de Examen',
      id_libreta: valor,
      nombre_curso: nombreCurso,
    });
  };

  const renderExamenes = ({item}: {item: Examenes}) => {
    return (
      <TouchableOpacity
        key={item.fecha + item.instancia}
        onPress={() => onPressCard(item.n_id_libreta)}
        style={[
          styles.cardContainer,
          {
            backgroundColor: item.nota > 5 ? '#C8E6C9' : '#FFCDD2',
            borderColor: item.nota > 5 ? '#C8E6C9' : '#FFCDD2',
          },
        ]}>
        <View>
          <Text
            style={[
              styles.descripcion,
              styles.textoGeneral,
              {
                color: item.nota > 5 ? '#388E3C' : '#D32F2F',
              },
            ]}>
            {item.instancia}
          </Text>
          <Text
            style={[
              styles.nota,
              styles.textoGeneral,
              {
                color: item.nota > 5 ? '#388E3C' : '#D32F2F',
              },
            ]}>
            Nota: {item.nota}
          </Text>
          <Text
            style={[
              styles.fecha,
              styles.textoGeneral,
              {
                color: item.nota > 5 ? '#388E3C' : '#D32F2F',
              },
            ]}>
            {item.fecha}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    data.length > 0 && (
      <View style={{marginBottom: 10}}>
        <Text style={[styles.title]}>{t('academico.examenesRendidos')}</Text>
        <FlatList
          data={data}
          renderItem={renderExamenes}
          keyExtractor={(item: Examenes) => `${item.instancia}${item.fecha}`}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    )
  );
};

export default ExamenesCards;
