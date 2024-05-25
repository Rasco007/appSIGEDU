import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Card from '../../card/index';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AppStyles from '../../../styles';
interface MenuGItemProps {
  encabezado: DDJJEncabezadoType[] | undefined;
  item: MenuGItemType;
  navigation: any;
  d_url_endpoint: any;
  d_title_back: any;
}
type MenuGItemType = {
  id: number;
  items: {
    [key: string]: string | number;
  };
};
type DDJJEncabezadoType = {
  clave: string;
  titulo: string;
  tipo: string;
  visible: boolean;
};
const MenuGItem: React.FC<MenuGItemProps> = ({
  item,
  encabezado,
  navigation,
  d_title_back,
  d_url_endpoint,
}) => {
  const onPressDocument = (valor: string | number) => {
    console.log(d_title_back);

    navigation.navigate('PdfScreen', {
      title: 'Visor PDF',
      id_archivo: valor,
      d_title_back: d_title_back,
      d_url_endpoint: d_url_endpoint,
    });
  };
  const stylesGral = AppStyles();
  return (
    <View key={item.id}>
      <Card style={stylesGral.bodyContainer}>
        <View style={{flexDirection: 'column', width: '100%'}}>
          {encabezado!.map(config => {
            const {clave, titulo, tipo, visible} = config;
            const valor = item.items[clave];
            if (clave == 'id_archivo') {
              if (valor) {
                return (
                  <Icon
                    key={clave}
                    onPress={() => onPressDocument(valor)}
                    name={'file-pdf'}
                    size={40}
                    style={stylesGral.documentIcon}
                  />
                );
              }
            } else {
              if (visible) {
                if (valor) {
                  if (clave == 'titulo_principal') {
                    return (
                      <View key={clave} style={{width: '90%'}}>
                        <Text style={stylesGral.titleCard}>{valor}</Text>
                      </View>
                    );
                  } else {
                    return (
                      <View key={clave} style={{width: '90%'}}>
                        <Text style={stylesGral.subtitleCard}>
                          {titulo}:{' '}
                          <Text style={stylesGral.itemText}>{valor}</Text>
                        </Text>
                      </View>
                    );
                  }
                }
              }
            }
            return null;
          })}
        </View>
      </Card>
    </View>
  );
};

export default MenuGItem;
