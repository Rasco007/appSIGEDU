import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CalendarScreen,
  MenuDinamicoScreen,
  Home2,
  NotificationScreen,
  NovedadScreen,
  TramiteScreen,
} from '../../screens';
import {COLORS} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomHeader, CustomTabBarIcon} from '../../components/index';
import {runOnJS} from 'react-native-reanimated';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainNavigator from '../main';
const BottomTabs = createBottomTabNavigator();

const Drawer = createDrawerNavigator();
const TabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Inicio"
      screenOptions={({route, navigation}) => ({
        tabBarLabelStyle: {
          fontSize: 12,
        },
        // tabBarIcon: ({ focused }) => showIcon(route, focused),
        // headerRight: () => menuIcon(navigation),
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        tabBarInactiveTintColor: COLORS.white,
        tabBarActiveTintColor: COLORS.white,
        tabBarShowLabel: false,

        header: props => <CustomHeader navigation={props.navigation} />,
      })}>
      <BottomTabs.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendario',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'calendar' : 'calendar-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Inicio"
        component={MainNavigator}
        options={{
          tabBarLabel: 'Home2',
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon
              iconName={focused ? 'home' : 'home-outline'}
              focused={focused}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="NovedadScreen"
        component={NovedadScreen}
        options={{
          tabBarLabel: 'Novedades',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'megaphone' : 'megaphone-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const menuIcon = (navigation: any) => {
  runOnJS(() => {
    navigation.toggleDrawer();
  });
};

export default TabsNavigator;
