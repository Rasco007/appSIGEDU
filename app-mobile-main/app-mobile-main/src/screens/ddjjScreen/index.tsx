import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';

import {styles} from './styles';
// import { COLORS, MenuItems } from "../../constants";
import {CardItem, MenuItem, DDJJItem} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';

type DDJJProps = {
  navigation: any;
};

type DDJJItemType = {
  id: number;
  title: string;
  estado: string;
  p_fiscal: string;
  f_presentacion: string;
};

const DdjjScreen: React.FC<DDJJProps> = ({navigation}) => {
  const [ddjjItems, setDdjjItems] = useState<DDJJItemType[] | null>(null);

  useEffect(() => {
    const data = require('../../utils/api/ddjj.json');
    setDdjjItems(data.cardsGeneral);
  }, []);

  const onSelected = (item: {
    id: number;
    estado: string;
    p_fiscal: string;
    f_presentacion: string;
  }) => {
    // navigation.navigate(item.screen, {
    //   title: item.title,
    // });
  };
  const renderItem = ({item, index}: {item: DDJJItemType; index: number}) => {
    // console.log(index);
    return (
      <DDJJItem key={index.toString()} item={item} onSelected={onSelected} />
    );
  };
  // const rendesrItem = ({ item }: { item: any }) => {
  //   console.log(item.id);
  //   return <MenuItem key={item.id} item={item} onSelected={onSelected}  />;
  // };

  // const renderItem = ({ item }:any) => <MenuItem item={item} onSelected={onSelected} />;
  // const keyExtractor = (item:any) => item.id;
  const keyExtractor = (item: DDJJItemType, index: number) => index.toString();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          renderItem={renderItem}
          data={ddjjItems}
          keyExtractor={keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
};

export default DdjjScreen;
