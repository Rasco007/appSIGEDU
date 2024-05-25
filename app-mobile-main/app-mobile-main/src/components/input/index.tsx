import {useContext, useState} from 'react';
import {Button, TextInput, Text, View} from 'react-native';
import {styles} from './styles';
import {AppContext} from '../../context/ClienteContex';

interface InputProps {
  placeholder: string;
  textValue: string;
  onChangeText: (text: string) => void;
  btnColor?: string;
  btnTitle?: string;
  onPressBtn?: () => void;
}
const Input: React.FC<InputProps> = ({
  placeholder,
  textValue,
  onChangeText,
  btnColor,
  btnTitle = '',
  onPressBtn,
}) => {
  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;

  return (
    <View style={styles.Inputcontainer}>
      <TextInput
        value={textValue}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={{color: color_texto}}
      />
      <Button title={btnTitle} onPress={onPressBtn} color={btnColor} />
    </View>
  );
};
export default Input;
