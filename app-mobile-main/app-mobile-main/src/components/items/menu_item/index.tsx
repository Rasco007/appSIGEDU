import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Card from '../../card/index';

interface MenuItemProps {
  item: any;
  onSelected: (item: {
    id: number;
    title: string;
    icon: string;
    screen: string;
  }) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({item, onSelected}) => {
  return (
    <View>
      {/* Mostrar el título arriba */}
      <Text style={styles.title}>{item.title}</Text>
      {/* Map sobre las claves/datos de "cards" que se deben mostrar abajo */}
      {item.cards.map((card: any, index: number) => (
        <Card key={index} style={styles.Inputcontainer}>
          <TouchableOpacity onPress={() => onSelected(card)}>
            <Text style={styles.title}>{card.title}</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
};

export default MenuItem;
