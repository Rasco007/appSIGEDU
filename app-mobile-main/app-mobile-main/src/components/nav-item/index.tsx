import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Card from '../card/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';

interface MenuItemProps {
  iconName: any;
  focused: any;
}
const CustomTabBarIcon: React.FC<MenuItemProps> = ({iconName, focused}) => {
  return (
    <View style={styles.tabContainer}>
      <View style={[styles.tabIcon, focused ? styles.focusedIcon : null]}>
        <Icon name={iconName} size={24} color={COLORS.primary} />
      </View>
    </View>
  );
};

export default CustomTabBarIcon;
