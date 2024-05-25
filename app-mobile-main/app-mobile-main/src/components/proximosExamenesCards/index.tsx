import React, {useContext} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import AppStyles from './styles';
import {AppContext} from '../../context/ClienteContex';

interface ProximosExamenes {
  descripcion: string;
  curso: string;
  fecha: string;
  horario: string;
}

interface ProximosExamenesCardsProps {
  data: ProximosExamenes[];
}

const ProximosExamenesCards: React.FC<ProximosExamenesCardsProps> = ({
  data,
}) => {
  const styles = AppStyles();
  const {t} = useTranslation();

  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;

  const renderProximosExamenes = ({item}: {item: ProximosExamenes}) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={{color: color_texto}}>{item.curso}</Text>
        <Text style={styles.fecha}>{item.fecha}</Text>
        <Text style={styles.horario}>
          {t('home.horario')}: {item.horario}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.title}>{t('home.proximosExamenes')}</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderProximosExamenes}
          keyExtractor={(item: ProximosExamenes) =>
            `${item.descripcion}${item.fecha}`
          }
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      ) : (
        <Text style={{color: color_texto}}>{t('home.noProxExamenes')}</Text>
      )}
    </View>
  );
};

export default ProximosExamenesCards;
