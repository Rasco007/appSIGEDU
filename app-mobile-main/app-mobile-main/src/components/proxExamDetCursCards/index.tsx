import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import AppStyles from './styles';

interface ProxExamDetCurs {
  instancia: string;
  curso: string;
  fecha: string;
  horario: string;
  aula: string;
}

interface ProxExamDetCursCardsProps {
  data: ProxExamDetCurs[];
}

const ProxExamDetCursCards: React.FC<ProxExamDetCursCardsProps> = ({data}) => {
  const styles = AppStyles();
  const {t} = useTranslation();

  const renderProxExamDetCurs = ({item}: {item: ProxExamDetCurs}) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.instancia}>{item.instancia}</Text>
        <Text style={styles.fecha}>{item.fecha}</Text>
        <Text style={styles.aula}>{item.aula}</Text>
        <Text style={styles.horario}>
          {t('academico.horario')}: {item.horario}
        </Text>
      </View>
    );
  };

  return (
    data.length > 0 && (
      <View>
        <Text style={styles.title}>{t('academico.proximosExamenes')}</Text>
        <FlatList
          data={data}
          renderItem={renderProxExamDetCurs}
          keyExtractor={(item: ProxExamDetCurs) =>
            `${item.instancia}${item.fecha}`
          }
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    )
  );
};

export default ProxExamDetCursCards;
