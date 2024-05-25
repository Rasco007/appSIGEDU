import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Card from '../../card/index';
import {Text} from 'react-native';

interface DDJJItemProps {
  item: any;
  onSelected: (item: {
    id: number;
    estado: string;
    p_fiscal: string;
    f_presentacion: string;
  }) => void;
}

const DDJJItem: React.FC<DDJJItemProps> = ({item, onSelected}) => {
  return (
    <View key={item.id}>
      <Card key={item.id} style={styles.bodyContainer}>
        <TouchableOpacity onPress={() => onSelected(item)}>
          <Text style={styles.title}>Ingresos Brutos Directo.</Text>
          <Text style={styles.subtitle}>
            Estado: <Text style={styles.itemText}>{item.estado}</Text>
          </Text>
          <Text style={styles.subtitle}>
            Periodo Fiscal:{' '}
            <Text style={styles.itemText}>{item.Periodo_Fiscal}</Text>
          </Text>
          <Text style={styles.subtitle}>
            Fecha de Presentación:{' '}
            <Text style={styles.itemText}>{item.f_presentacion}</Text>
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default DDJJItem;
