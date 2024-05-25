import React, {useEffect, useState, useContext} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {styles} from './styles';
import MenuItem from '../../components/menu-item';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {AppContext} from '../../context/ClienteContex';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {SubMenuItem} from '../../navigation/drawer';

type HomeProps = {
  navigation: any;
};

interface MenuItem {
  d_title: string;
  d_url: string;
  d_icon: string;
  d_tipo: string;
  d_url_endpoint?: string;
  menuList?: SubMenuItem[];
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const {state, dispatch} = useContext(AppContext);
  const Separator: React.FC = () => <View style={styles.separator} />;
  const {t} = useTranslation();
  const {menus} = state.cliente;
  // const { menusCards }: any = menus;
  const {MenuSelectedUser} = state.cliente;
  const {selectedItemMenu, MenuIndex}: any = MenuSelectedUser;
  // const [menuItems, setMenuItems] = useState<MenuItem[]>(menusCards);

  useEffect(() => {
    const filteredMenuItems = MenuItems.filter(
      (item: MenuItem) => item.d_url !== 'Dash',
    );
    seMenuItems(filteredMenuItems);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const menuSelectedUser = {
        selectedMenu: 'Dash',
        selectedItemMenu: 'none',
      };

      dispatch({
        type: 'SET_SELECT_MENU_USER',
        MenuSelectedUser: menuSelectedUser,
      });

      return () => {
        // Lógica de limpieza si es necesario al salir de la pantalla
      };
    }, [dispatch]),
  );

  const onSelected = (
    item: {
      d_title: string;
      d_icon: string;
      d_url: string;
      d_tipo: string;
      d_url_endpoint: string;
      parentUrl: string;
    },
    index: number,
  ) => {
    const isChildMenu = !!item.parentUrl;
    const selectedMenu = isChildMenu ? item.parentUrl : item.d_url;

    const menuSelectedUser = {
      selectedMenu,
      selectedItemMenu: item.d_url,
    };

    dispatch({
      type: 'SET_SELECT_MENU_USER',
      MenuSelectedUser: menuSelectedUser,
    });

    if (item.d_tipo === 'ITEM') {
      navigation.navigate(item.d_url, {
        title: item.d_title,
        url: item.d_url,
        endpoint: item.d_url_endpoint,
      });
    }
  };
  const [MenuItems, seMenuItems] = useState<MenuItem[]>(menus);

  const renderItem = ({item, index}: {item: MenuItem; index: number}) => {
    return (
      <MenuItem key={index} item={item} index={index} onSelected={onSelected} />
    );
  };

  const keyExtractor = (item: MenuItem, index: number) => index.toString();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerUser}></View>
      {/* <Text style={[{ color: state.cliente.color_primario }, styles.title]}>
              {t('Dashboard.title_principal')}
      </Text> */}
      {MenuItems.map((item: MenuItem, index: any) => (
        <React.Fragment key={item.d_url}>
          {(item.d_tipo === 'MENU' && item.menuList!.length > 0 && (
            <Animated.View
              entering={FadeInUp.duration(100)}
              style={styles.containerItems}>
              <>
                <Text
                  style={[{color: state.cliente.color_primario}, styles.title]}>
                  {item.d_title}
                </Text>
                <Separator />
                <FlatList
                  data={item.menuList!.filter(
                    childItem => childItem.d_tipo === 'ITEM',
                  )}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                />
              </>
            </Animated.View>
          )) ||
            (item.d_tipo === 'ITEM' && (
              <Animated.View
                entering={FadeInUp.duration(100)}
                style={styles.container_itemMenu}>
                <MenuItem
                  key={item.d_url}
                  item={item}
                  index={index}
                  onSelected={onSelected}
                />
              </Animated.View>
            ))}
        </React.Fragment>
      ))}
    </SafeAreaView>
  );
};

export default Home;
