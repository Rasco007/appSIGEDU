import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';

import AppStyles from './styles';
import {AppContext} from '../../context/ClienteContex';
import {styles} from '../../utils/styles/index';

interface Historial {
  nombreLargoCurso: string;
  nombreCurso: string;
  estado: string;
  docente: string;
  periodo: string;
  nota: number | null | undefined;
  n_id_libreta: string;
}

interface HistorialCardsProps {
  data: Historial[];
  navigation: any;
  route: any;
  promedio: number;
}

const HistorialCards: React.FC<HistorialCardsProps> = ({
  data,
  navigation,
  route,
  promedio
}) => {
  const styles = AppStyles();
  const {state} = useContext(AppContext);
  const {menus} = state.cliente;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  // const [promedio, setPromedio] = useState<number | null>(null);

  const onPressCard = (valor: string, valor1: string) => {
    navigation.navigate('DetalleExamenScreen', {
      title: 'Detalle de Examen',
      id_libreta: valor,
      nombre_curso: valor1,
    });
  };

  useEffect(() => {
    // const notas: any[] = data.map(data =>
    //   data.nota === null ? 0 : parseFloat(data.nota),
    // );
    // const sumaNotas: number = notas.reduce((total, nota) => total + nota, 0);
    // const promedioCalculado: number = sumaNotas / notas.length;
    // setPromedio(promedioCalculado);
    setFilteredData(data);
  }, [data]);

  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const handleSearch = (text: string) => {
    // Remover las tildes del texto de búsqueda
    const searchText = removeAccents(text.toUpperCase());

    const newData = data.filter(item => {
      // Remover las tildes de los datos del item
      const itemData = `${removeAccents(
        item.nombreCurso.toUpperCase(),
      )} ${removeAccents(item.docente.toUpperCase())}`;
      return itemData.indexOf(searchText) > -1;
    });
    setSearchQuery(text);
    setFilteredData(newData);
  };

  const renderItemHistorial = ({item}: {item: Historial}) => {
    return (
      <TouchableOpacity
        key={item.n_id_libreta}
        onPress={() => onPressCard(item.n_id_libreta, item.nombreLargoCurso)}
        style={[
          styles.cardContainer,
          {
            backgroundColor: item.estado == 'APRB' ? '#C8E6C9' : '#FFCDD2',
            borderColor: item.estado == 'APRB' ? '#C8E6C9' : '#FFCDD2',
          },
        ]}>
        <View>
          <Text
            style={[
              styles.nombreCurso,
              styles.textoGeneral,
              {
                color: item.estado == 'APRB' ? '#388E3C' : '#D32F2F',
              },
            ]}>
            {item.nombreCurso}
          </Text>
          <Text
            style={[
              styles.textoGeneral,
              {
                color: item.estado == 'APRB' ? '#388E3C' : '#D32F2F',
              },
            ]}>
            Estado: {item.estado == 'APRB' ? 'Aprobado' : 'Desaprobado'}
          </Text>
          <Text
            style={[
              styles.textoGeneral,
              {
                color: item.estado == 'APRB' ? '#388E3C' : '#D32F2F',
              },
            ]}>
            Profesor/a: {item.docente}
          </Text>

          <View
            style={[
              styles.periodoAula,
              styles.textoGeneral,
              {
                color: item.estado == 'APRB' ? '#388E3C' : '#D32F2F',
              },
            ]}>
            <Text
              style={[
                styles.textoGeneral,
                {
                  color: item.estado == 'APRB' ? '#388E3C' : '#D32F2F',
                },
              ]}>
              Período: {item.periodo}
            </Text>
            <View style={styles.aulaContainer}>
              <Text
                style={{
                  ...styles.promedioText,
                  ...styles.textoGeneral,
                  color: '#388E3C',
                }}>
                {item.nota ? 'Nota: ' + item.nota : null}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar..."
        onChangeText={handleSearch}
        value={searchQuery}
        showDivider={false}
        inputStyle={styles.searchText}
        style={styles.searchContainer}
      />
      <View style={styles.promedioContainer}>
        <View style={styles.promedioItems}>
          <Text style={{...styles.promedioText, color: 'white'}}>Promedio</Text>
        </View>
        <View style={{...styles.promedioItems, ...styles.promedioItemIcon}}>
          <Icon name="chart-simple" size={15} color={styles.color_primario} />
          <Text style={styles.promedioText}>
            {promedio !== undefined ? promedio : ''}
          </Text>
        </View>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItemHistorial}
        keyExtractor={(item: Historial) => `${item.nombreCurso}${item.docente}`}
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 200}}
      />
    </View>
  );
};

export default HistorialCards;
