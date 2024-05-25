import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {styles} from './styles';
type Props = {
  title: any;
  onPress: any;
};

const CustomButton: React.FC<Props> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
