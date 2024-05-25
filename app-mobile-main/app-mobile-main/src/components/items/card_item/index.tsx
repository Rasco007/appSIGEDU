import {useState} from 'react';
import {
  Button,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import Card from '../../card/index';
interface CardProps {
  item: any;
  onSelected: any;
  displayKeys: string[]; // prop para indicar qué claves/datos mostrar
}
const CardItem: React.FC<CardProps> = ({item, onSelected, displayKeys}) => {
  return (
    <TouchableOpacity key={item.id} onPress={() => onSelected(item)}>
      <Card style={styles.card}>
        {/* Map sobre las claves/datos que se deben mostrar */}
        {displayKeys.map(
          key =>
            // Verifica si la clave existe en el objeto antes de mostrarla
            item[key] !== undefined && (
              <View>
                <Text style={styles.text}>{`${item[key]}`}</Text>
              </View>
            ),
        )}
      </Card>
    </TouchableOpacity>
  );
};
export default CardItem;
