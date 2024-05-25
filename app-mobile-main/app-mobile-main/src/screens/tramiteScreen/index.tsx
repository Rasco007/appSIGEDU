import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';

import {styles} from './styles';
import {COLORS} from '../../constants';
import {CardItem} from '../../components';
import {AppContext} from '../../context/ClienteContex';

type TramiteProps = {
  navigation: any;
};
const TramiteScreen: React.FC<TramiteProps> = ({navigation}) => {
  const [data, setData] = useState<any[] | null>(null);

  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;

  useEffect(() => {
    const url = '../../api/ddjj';
    const data = require('../../utils/api/ddjj');
    setData(data);
    // const fetchData = async () => {
    //   try {
    //     // Importa el archivo JSON local
    //     let response = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //           'Accept': 'application/json',
    //           'Content-type':'application/json'
    //       },
    //       body: JSON.stringify({
    //           key: 'value',
    //       })
    //   });

    //     // Verifica si la solicitud fue exitosa (código de estado 200)
    //     if (response.ok) {
    //       const jsonData = await response.json();
    //       setData(jsonData);
    //     } else {
    //       console.error('Error al cargar datos:', response.statusText);
    //     }
    //   } catch (error) {
    //     console.error('Error al realizar la solicitud:', error);
    //   }
    // };

    // Solo ejecuta el efecto cuando la URL cambie
    // fetchData();
  }, []);

  const datos = ['estado', 'Periodo_Fiscal', 'f_presentacion'];
  const onSelected = (item: {screen: string; title: string}) => {
    // console.warn('hola');
  };

  const renderItem = ({item}: {item: any}) => {
    // console.log(item.id);
    return (
      <CardItem
        key={item.id}
        item={item}
        onSelected={onSelected}
        displayKeys={datos}
      />
    );
  };

  const keyExtractor = (item: any) => item.id.toString();

  return (
    <View style={styles.container}>
      <Text style={{color: color_texto}}>Tramites</Text>
      <FlatList
        renderItem={renderItem}
        data={data}
        keyExtractor={keyExtractor}></FlatList>
    </View>
  );
};

export default TramiteScreen;
