import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Modal from 'react-native-modal';

interface LanguageSwitcherProps {
  languageSelected?: string;
  languages: string[];
  onChangeLanguage: (language: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  languageSelected = 'ES',
  languages,
  onChangeLanguage,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleLanguageSelect = (language: string) => {
    onChangeLanguage(language);
    toggleModal(); // Cierra el modal después de seleccionar un idioma
  };
  return (
    <View>
      <TouchableOpacity
        onPress={toggleModal}
        style={{
          position: 'absolute',
          top: 30,
          right: 15,
          borderWidth: 1.5,
          borderColor: 'gray',
          padding: 5,
          borderRadius: 50,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="globe" size={22} color="gray" />
          <Text style={{paddingLeft: 10, fontSize: 15, color: 'gray'}}>
            {languageSelected}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {languages.map(language => (
            <TouchableOpacity
              key={language}
              onPress={() => handleLanguageSelect(language)}>
              <Text
                style={{marginHorizontal: 30, fontSize: 50, color: 'white'}}>
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default LanguageSwitcher;
