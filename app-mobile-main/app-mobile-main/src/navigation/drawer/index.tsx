import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';
// import TabsNavigator from '../tabs/index';
import {ContextLogin} from '../../context/AuthContextLog';
import {
  CustomHeader,
  CustomTabBarIcon,
  LanguageSwitcher,
} from '../../components/index';
import Modal from 'react-native-modal';
import {AppContext} from '../../context/ClienteContex';
import AppStyles from './styles';
import {
  //Home,
  CalendarScreen,
  NotificationScreen,
  MenuDinamicoScreen,
  TramiteScreen,
  NovedadScreen,
  PerfilScreen,
  ImpuestoScreen,
  ComponentsScreen,
  PDFViewer,
  Home2,
  AcademicoScreen,
  DetalleCursoScreen,
  DetalleExamenScreen,
} from '../../screens';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import Animated from 'react-native-reanimated';
import {useDialog} from '../../context/DialogContext';
import {useFocusEffect} from '@react-navigation/native';
import {decode} from 'base-64';
import axios from 'axios';
import {apiConfigClient} from '../../services/api';
import { handleLogoutApp } from '../../store/auth/authStore';

export interface SubMenuItem {
  d_title: string;
  d_url: string;
  d_icon: string;
  d_tipo: string;
  d_url_endpoint?: string;
  parentUrl?: string; // Nueva propiedad para el URL del menú padre
}
export interface MenuItem {
  d_title: string;
  d_url: string;
  d_icon: string;
  d_tipo: string;
  d_url_endpoint?: string;
  menuList?: SubMenuItem[];
}

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const Separator: React.FC = () => <View style={styles.separator} />;
  const {logOut} = useContext(ContextLogin);
  const imageSource = require('../../img/profile_icon.png');
  const {state, dispatch} = useContext(AppContext);
  const {menus}: any = state.cliente;
  const {usuario} = state.cliente;
  const {idiomas, idioma_seleccionado} = state.cliente;
  const {color_primario, color_secundario} = state.cliente;
  const {MenuSelectedUser} = state.cliente;
  const {selectedMenu, selectedItemMenu}: any = MenuSelectedUser;
  const styles = AppStyles();
  const {t} = useTranslation();
  //si es tipo menu y no tiene menuList que se oculte el menu osea que no se muesstre
  // si tiene tiene menuList > 0 que se muestre y se despliegue
  //si es de tipo item tiene si tiene que redireccionar osea solo tiene uqe redireccionar

  const [drawerItems, setDrawerItems] = useState<MenuItem>(menus);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleDrawerItemPress = (item: MenuItem, index: any) => {
    if (item.menuList && item.menuList.length > 0) {
      handleMenuPress(item, index);
    } else {
      const menuSelectedUser = {
        selectedMenu: item.d_url,
        selectedItemMenu: item.d_url,
      };

      dispatch({
        type: 'SET_SELECT_MENU_USER',
        MenuSelectedUser: menuSelectedUser,
      });

      props.navigation.navigate(item.d_url);
    }
  };

  const handleMenuPress = (item: MenuItem, index: any) => {
    if (item.d_url === selectedMenu) {
      const menuSelectedUser = {
        selectedMenu: 'none',
        selectedItemMenu: '',
      };
      dispatch({
        type: 'SET_SELECT_MENU_USER',
        MenuSelectedUser: menuSelectedUser,
      });
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const menuSelectedUser = {
        selectedMenu: item.d_url,
        selectedItemMenu: selectedItemMenu,
      };
      dispatch({
        type: 'SET_SELECT_MENU_USER',
        MenuSelectedUser: menuSelectedUser,
      });
    }
  };
  const handleSubMenuPress = (subMenu: SubMenuItem) => {
    props.navigation.navigate(subMenu.d_url, {
      title: subMenu.d_title,
      url: subMenu.d_url,
      endpoint: subMenu.d_url_endpoint,
    });
    const menuSelectedUser = {
      selectedMenu: selectedMenu,
      selectedItemMenu: subMenu.d_url,
    };

    dispatch({
      type: 'SET_SELECT_MENU_USER',
      MenuSelectedUser: menuSelectedUser,
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLanguageSelect = (language: string) => {
    onChangeLanguage(language);
    toggleModal(); // Cierra el modal después de seleccionar un idioma
  };
  const handleItemPress = (item: SubMenuItem) => {
    props.navigation.navigate(item.d_url, {
      title: item.d_title,
      url: item.d_url,
      endpoint: item.d_url_endpoint,
    });
    const menuSelectedUser = {
      selectedMenu: item.d_url,
      selectedItemMenu: '',
    };

    dispatch({
      type: 'SET_SELECT_MENU_USER',
      MenuSelectedUser: menuSelectedUser,
    });
    // dispatch({ type: 'SET_SELECT_MENU', selectedMenu: item.d_url });
  };
  const onChangeLanguage = useCallback(
    (language: string) => {
      const datosCliente = {
        idiomas: idiomas,
        idioma_seleccionado: language,
      };
      dispatch({type: 'SET_CLIENTE', payload: datosCliente});
      i18next.changeLanguage(language.toLowerCase());
    },
    [dispatch, idiomas],
  );
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Icon name={'person-circle-outline'} size={65} color={COLORS.white} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{usuario?.nombre}</Text>
            {/* <Text style={styles.userEmail}>example@tdi.com</Text> */}
            <TouchableOpacity
              onPress={() =>
                handleItemPress({
                  d_title: 'Perfil de usuario',
                  d_url: 'PerfilScreen',
                  d_icon: 'person-circle-outline',
                  d_tipo: 'item',
                })
              }
              style={{
                borderColor: '#fff',
                borderWidth: 2,
                marginTop: 10,
                height: 35,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{...styles.verPerfil}}>
                {t('drawer.ver_perfil')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {drawerItems!.map((item: MenuItem, index: any) => (
          <React.Fragment key={item.d_url}>
            {(item.d_tipo === 'ITEM' ||
              (item.d_tipo === 'MENU' &&
                item.menuList &&
                item.menuList.length > 0)) && (
              <TouchableOpacity
                key={index}
                style={[
                  styles.drawerStyles,
                  {backgroundColor: COLORS.lightGray},
                ]}
                // onPress={() => {
                //   // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                //   LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
                //   setMenuIndex(menuIndex === index ? -1 : index)
                // }}
              >
                <DrawerItem
                  key={item.d_url}
                  label={item.d_title}
                  // onPress={() => handleItemPress(item)}
                  focused={selectedMenu === item.d_url}
                  icon={({focused, color, size}) => (
                    <Icon name={item.d_icon} size={28} color={color} />
                  )}
                  activeTintColor={
                    selectedMenu === item.d_url
                      ? state.cliente.color_primario
                      : 'black'
                  }
                  activeBackgroundColor={
                    selectedMenu === item.d_url ? COLORS.lightGraymas : 'white'
                  }
                  style={styles.drawerItemStyles}
                  onPress={
                    () => {
                      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                      handleDrawerItemPress(item, index);
                    }
                    // dispatch({ type: 'SET_SELECT_MENU', selectedMenu: item.d_url });
                  }
                />
                <TouchableOpacity
                  style={styles.drawerItemContainer}
                  onPress={
                    () => {
                      handleDrawerItemPress(item, index);
                    }
                    // dispatch({ type: 'SET_SELECT_MENU', selectedMenu: item.d_url });
                  }>
                  {item.menuList && item.menuList.length > 0 && (
                    <Icon
                      name={
                        selectedMenu === item.d_url
                          ? 'chevron-down'
                          : 'chevron-forward'
                      }
                      size={25}
                      color={
                        selectedMenu === item.d_url
                          ? color_primario
                          : COLORS.darkGray
                      }
                    />
                  )}
                </TouchableOpacity>

                {selectedMenu === item.d_url && (
                  <Animated.View
                    style={[
                      {borderRadius: 10, marginHorizontal: 20},
                      {backgroundColor: COLORS.lightGray},
                    ]}>
                    {item.menuList?.map((subMenu: SubMenuItem, index: any) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleSubMenuPress(subMenu)}>
                        <View style={[styles.subMenus]}>
                          <Icon
                            name={subMenu.d_icon}
                            size={22}
                            color={
                              selectedItemMenu === subMenu.d_url
                                ? color_primario
                                : COLORS.darkGray
                            }
                          />
                          <Text
                            style={[
                              {paddingLeft: 15},
                              {
                                // color: menuIndex === index ? COLORS.black : COLORS.lightGray,
                                color: COLORS.black,
                              },
                            ]}>
                            {subMenu.d_title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </Animated.View>
                )}
              </TouchableOpacity>
            )}
          </React.Fragment>
        ))}
      </DrawerContentScrollView>

      <View style={styles.logoutButton}>
        {idiomas.length > 1 && (
          <View>
            <Separator />

            <TouchableOpacity
              key={idioma_seleccionado}
              onPress={() => handleLanguageSelect(idioma_seleccionado!)}
              style={styles.languageButton}>
              <Icon name={'globe'} size={30} color={COLORS.darkGray} />
              <Text style={styles.languageButtonText}>{t('idioma')}</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <View style={styles.modalView}>
                <View>
                  <Icon name={'globe'} size={40} color={COLORS.darkGray} />
                </View>

                {idiomas.map(language => (
                  <TouchableOpacity
                    key={language}
                    onPress={() => handleLanguageSelect(language)}
                    style={styles.modalContent}>
                    <Text
                      style={[
                        styles.modalText,
                        {
                          color:
                            language === idioma_seleccionado
                              ? color_primario
                              : COLORS.black,
                        },
                      ]}>
                      {language}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          </View>
        )}

        <Separator />
        <TouchableOpacity
          onPress={handleLogoutApp}
          style={{
            flexDirection: 'row', // Alineación horizontal
            alignItems: 'center', // Centra los elementos verticalmente
            padding: 5,
            backgroundColor: '#f6f6f6',
            borderRadius: 10,
          }}>
          <Icon name={'exit'} size={30} color={COLORS.darkGray} />
          <Text style={styles.logoutText}>{t('drawer.cerrar_sesion')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigation: React.FC = () => {
  const screens = [
    {
      name: 'Dash',
      component: Home2,
    },
    {
      name: 'Notification',
      component: NotificationScreen,
    },
    {
      name: 'Tramites',
      component: TramiteScreen,
    },
    {
      name: 'MenuDinamicoScreen',
      component: MenuDinamicoScreen,
    },
    {
      name: 'NovedadScreen',
      component: NovedadScreen,
    },
    {
      name: 'CalendarScreen',
      component: CalendarScreen,
    },

    {
      name: 'PerfilScreen',
      component: PerfilScreen,
    },
    {
      name: 'PdfScreen',
      component: PDFViewer,
    },
    {
      name: 'ImpuestoScreen',
      component: ImpuestoScreen,
    },

    {
      name: 'Componentes',
      component: ComponentsScreen,
    },
    {
      name: 'Home2',
      component: Home2,
    },
    {
      name: 'AcademicoScreen',
      component: AcademicoScreen,
    },
    {
      name: 'DetalleCursoScreen',
      component: DetalleCursoScreen,
    },
    {
      name: 'DetalleExamenScreen',
      component: DetalleExamenScreen,
    },
  ];
  const screenOptions = ({navigation, route}: any) => {
    return {
      header: () => <CustomHeader navigation={navigation} route={route} />,
    };
  };

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      backBehavior="history"
      drawerContent={props => <DrawerContent {...props} />}>
      {screens.map(screen => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}

      {/* <Drawer.Screen
        name="Home"
        // component={TabsNavigator}
        component={MainNavigator}
        options={{
          title: 'Inicio',
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
