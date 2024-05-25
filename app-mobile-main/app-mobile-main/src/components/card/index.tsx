import React, {ReactNode} from 'react';
import {View} from 'react-native';

import {styles} from './styles';

interface CardProps {
  children: ReactNode;
  style?: object;
}

const Card: React.FC<CardProps> = ({children, style}) => {
  return <View style={[styles.cardContainer, style]}>{children}</View>;
};

export default Card;
