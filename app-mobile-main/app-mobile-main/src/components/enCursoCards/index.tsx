import React, {useContext, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';
import IonicIcon from 'react-native-vector-icons/Ionicons';

import {useTranslation} from 'react-i18next';
import AppStyles from './styles';
import {AppContext} from '../../context/ClienteContex';

interface EnCurso {
  nombreCurso: string;
  estado: string;
  docente: string;
  periodo: string;
  aula: string;
  n_id_alu_cur: number;
}

interface EnCursoCardsProps {
  data: EnCurso[];
  navigation: any;
  route: any;
}

const EnCursoCards: React.FC<EnCursoCardsProps> = ({
  data,
  navigation,
  route,
}) => {
  const styles = AppStyles();
  const {t} = useTranslation();
  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;

  const {menus} = state.cliente;

  const onPressCard = (valor: string) => {
    navigation.navigate('DetalleCursoScreen', {
      title: 'Detalle de Curso',
      id_alu_cur: valor,
    });
  };

  const renderItemEnCurso = ({item}: {item: EnCurso}) => {
    let iconoEstado;
    let estilosIcono;
    if (item.estado === 'Regular') {
      iconoEstado = 'checkmark-circle'; // Icono para el estado activo
      estilosIcono = styles.iconoVerde;
    } else {
      iconoEstado = 'warning'; // Icono para cualquier otro estado
      estilosIcono = styles.iconoAmarillo;
    }

    return (
      <TouchableOpacity
        key={item.nombreCurso + item.docente}
        onPress={() => onPressCard(item.n_id_alu_cur)}
        style={styles.cardContainer}>
        <Text style={styles.nombreCurso}>{item.nombreCurso}</Text>
        <View style={styles.locationIcon}>
          <IonicIcon name={iconoEstado} size={25} style={estilosIcono} />
        </View>
        <Text style={{color: color_texto}}>Estado: {item.estado}</Text>
        <Text style={{color: color_texto}}>Profesor/a: {item.docente}</Text>
        <View style={styles.periodoAula}>
          <Text style={{color: color_texto}}>Período: {item.periodo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItemEnCurso}
        keyExtractor={(item: EnCurso) => `${item.nombreCurso}${item.docente}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default EnCursoCards;
