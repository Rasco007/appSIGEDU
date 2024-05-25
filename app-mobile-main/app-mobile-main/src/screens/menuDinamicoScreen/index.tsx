import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {styles} from './styles';
import {MenuGItem} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {apiClient} from '../../services/api';
import {AppContext} from '../../context/ClienteContex';
import {ActivityIndicator} from 'react-native-paper';
import AppStyles from '../../styles';
import {useDialog} from '../../context/DialogContext';

type MenuDinamicoProps = {
  navigation: any;
  route: any;
  item: any;
};
type MenuDinamicoItemType = {
  id: number;
  items: {
    [key: string]: string | number;
  };
};
type MenuDinamicoEncabezadoType = {
  clave: string;
  titulo: string;
  tipo: string;
  visible: boolean;
};
const MenuDinamicoScreen: React.FC<MenuDinamicoProps> = ({
  navigation,
  route,
}) => {
  const [menuItems, setMenuItems] = useState<MenuDinamicoItemType[]>();
  const [menuEncabezado, setMenuEncabezado] =
    useState<MenuDinamicoEncabezadoType[]>();
  const {handleLogout} = useContext(AppContext);
  const [loading, setLoading] = useState('loading');
  const {endpoint, title} = route.params;
  const stylesGral = AppStyles();
  const {setTitulo, setMensaje, setVisible} = useDialog();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const apiClient = axios.create(apiConfigClient);
        let responseClient = await apiClient.post(endpoint); //url_endpoint
        const {datos, encabezado} = responseClient.data.data;
        setMenuItems(datos);
        setMenuEncabezado(encabezado);
        setLoading('loaded');
      } catch (error: any) {
    
        if (error.response.status != 401) {
          setTitulo('generales.tituloError');
          setMensaje(error.toString());
          setVisible(true);
        }
      }
    };
    setLoading('loading');
    fetchData();
  }, [endpoint]);

  const renderItem = ({
    item,
    index,
  }: {
    item: MenuDinamicoItemType;
    index: number;
  }) => {
    return (
      <MenuGItem
        key={item.id.toString()}
        item={item}
        encabezado={menuEncabezado}
        navigation={navigation}
        d_title_back={title}
        d_url_endpoint={endpoint}
      />
    );
  };
  const keyExtractor = (item: MenuDinamicoItemType) => item.id.toString();
  return (
    <SafeAreaView style={stylesGral.containerPdf}>
      <View>
        {loading === 'loading' ? (
          <ActivityIndicator
            animating={true}
            size={100}
            style={stylesGral.loading}
          />
        ) : (
          menuItems &&
          menuEncabezado && (
            <FlatList
              renderItem={renderItem}
              data={menuItems}
              keyExtractor={keyExtractor}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default MenuDinamicoScreen;
