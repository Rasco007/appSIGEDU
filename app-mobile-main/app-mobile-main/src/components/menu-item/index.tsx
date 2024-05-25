import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import Card from '../card/index';
import {AppContext} from '../../context/ClienteContex';
import AppStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';

interface MenuItemProps {
  item: {
    d_title: string;
    d_url: string;
    d_icon: string;
    d_tipo?: string;
    d_url_endpoint?: string;
  };
  index: number;
  onSelected: (
    item: {
      d_title: string;
      d_icon: string;
      d_url: string;
      d_tipo: string;
      d_url_endpoint: string;
    },
    index: number | -1,
  ) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({item, index, onSelected}) => {
  const {state, dispatch} = useContext(AppContext);
  const styles = AppStyles();

  return (
    // <Card key={item.d_url} style={styles.Inputcontainer}>
    <TouchableOpacity
      activeOpacity={0.3}
      style={styles.cardContainer}
      onPress={() => onSelected(item, index)}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.d_title}</Text>
        <Icon
          name={item.d_icon}
          size={24}
          color={state.cliente.color_primario}
        />
      </View>
    </TouchableOpacity>
    // </Card>
  );
};

export default MenuItem;
