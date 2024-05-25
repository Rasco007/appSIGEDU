import React, {useRef, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  Switch,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Animated,
  ColorValue,
} from 'react-native';

import {
  Avatar,
  Badge,
  Button as RNPButton,
  Checkbox,
  Chip,
  Divider,
  HelperText,
  TextInput,
  Icon,
  ProgressBar,
  RadioButton,
  Searchbar,
  SegmentedButtons,
} from 'react-native-paper';

import {useTranslation} from 'react-i18next';

import AppStyles from './styles';
import {
  Calendario,
  CardPerfil,
  CarouselApp,
  CustomButton,
  CustomTabBarIcon,
  Input,
  Modals,
} from '../../components';
import Card from '../../components/card';
import NotificationItem from '../../components/items/notification_item';
import {COLORS} from '../../constants/themes/colors';

const hoy = new Date();

const calendarioData = {
  state: 'OK',
  events: [
    {
      title: `Lorem ipsum ${hoy.getDate()}/${
        hoy.getMonth() + 1
      }/${hoy.getFullYear()}`,
      date: `${hoy.getFullYear()}-${
        hoy.getMonth() + 1
      }-${hoy.getDate()}T10:00:00`,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentum fringilla. Fusce id purus eu magna mollis posuere sit amet id justo',
    },
    {
      title: `Lorem ipsum ${hoy.getDate() + 4}/${
        hoy.getMonth() + 1
      }/${hoy.getFullYear()}`,
      date: `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${
        hoy.getDate() + 4
      }T10:00:00`,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentum fringilla. Fusce id purus eu magna mollis posuere sit amet id justo',
    },
    {
      title: `Lorem ipsum ${hoy.getDate() + 10}/${
        hoy.getMonth() + 1
      }/${hoy.getFullYear()}`,
      date: `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${
        hoy.getDate() + 10
      }T10:00:00`,
      body: 'lorem lorem lorem',
    },
  ],
};

const carouselData = [
  {
    title: 'Lorem ipsum 1',
    urlImage: 'https://picsum.photos/id/237/350/300',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentum fringilla. Fusce id purus eu magna mollis posuere sit amet id justo. Nullam tincidunt diam in magna commodo ullamcorper at eu arcu. Sed gravida non magna et pellentesque. Nullam interdum enim tristique cursus finibu',
  },
  {
    title: 'Lorem ipsum 2',
    urlImage: 'https://picsum.photos/id/250/350/300',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentum fringilla. Fusce id purus eu magna mollis posuere sit amet id justo. Nullam tincidunt diam in magna commodo ullamcorper at eu arcu. Sed gravida non magna et pellentesque. Nullam interdum enim tristique cursus finibus',
  },
  {
    title: 'Lorem ipsum 3',
    urlImage: 'https://picsum.photos/id/399/350/300',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentum fringilla. Fusce id purus eu magna mollis posuere sit amet id justo. Nullam tincidunt diam in magna commodo ullamcorper at eu arcu. Sed gravida non magna et pellentesque. Nullam interdum enim tristique cursus finibus',
  },
];

const ComponentsScreen = () => {
  const styles = AppStyles();

  const {t} = useTranslation();

  let color_primario: ColorValue | string | undefined =
    styles.color_primario === undefined
      ? (COLORS.primary as ColorValue)
      : (styles.color_primario as ColorValue);

  //SWITCH
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  //ANIMATED
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 1 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 1 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  //RNP Checkbox
  const [cbChecked, setCbChecked] = useState(false);

  //TextInput & HelperText
  const [textInputText, setTextInputText] = useState<string>('');
  const onChangeText = (text: string) => {
    setTextInputText(text);
  };

  const hasErrors = () => {
    return textInputText !== '' && !textInputText.includes('@');
  };

  //RNP RadioButton
  const [rbChecked, setRbChecked] = useState('first');

  //RNP Searchbar
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  //RNP SegmentedButtons
  const [sbValue, setSbValue] = React.useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const [notificationItemData, setNotificationItemData] = useState({
    nroNotif: 1,
    titulo: t('Componentes.dataNotificacion.titulo'),
    prioridad: t('Componentes.dataNotificacion.prioridad'),
    referencia: t('Componentes.dataNotificacion.referencia'),
    f_notif: `${hoy.getDate()}/${
      hoy.getMonth() + 1
    }/${hoy.getFullYear()} ${hoy.getHours()}:${hoy.getMinutes()}`,
    leido: false,
    estado: t('Componentes.dataNotificacion.estado'),
    f_leido: '',
    c_usuario_lec: t('Componentes.dataNotificacion.c_usuario_lec'),
    contenido: t('Componentes.dataNotificacion.contenido'),
  });

  const onPressNotificationItem = () => {
    setNotificationItemData({
      ...notificationItemData,
      leido: true,
      f_leido: `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()} ${
        hoy.getHours
      }:${hoy.getMinutes()}`,
    });
  };

  const carouselRenderItem = ({item}: {item: any}) => (
    <Image source={{uri: item.urlImage}} style={{width: 350, height: 300}} />
  );

  return (
    <ScrollView style={styles.container}>
      {/* *******************************************************************************************
                                        COMPONENTES REACT NATIVE CORE
            ******************************************************************************************* */}
      <Text style={styles.title}>{t('Componentes.tituloCRN')}</Text>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Button</Text>
        <Button
          onPress={() => {}}
          title={t('Componentes.tituloBoton')}
          color={color_primario}
        />
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Switch</Text>
        <View style={{alignItems: 'center'}}>
          <Switch
            trackColor={{false: '#767577', true: COLORS.lightPrimary}}
            thumbColor={isEnabled ? color_primario : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>FlatList</Text>
        <FlatList
          data={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ]}
          renderItem={({item}) => (
            <Text style={{marginHorizontal: 10}}>{item}</Text>
          )}
          keyExtractor={(item: number) => item.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>ActivityIndicator</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <ActivityIndicator size="small" color={color_primario} />
          <ActivityIndicator size="large" color={color_primario} />
          <ActivityIndicator size={60} color={color_primario} />
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Alert</Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Button
            title={t('Componentes.tituloBotonAlerta')}
            onPress={() => {
              Alert.alert(
                t('Componentes.tituloAlerta'),
                t('Componentes.mensajeAlerta'),
                [
                  {
                    text: t('Componentes.textoPreguntarMasTarde'),
                    onPress: () =>
                      console.log(t('Componentes.textoPreguntarMasTarde')),
                  },
                  {
                    text: t('Componentes.textoCancelar'),
                    onPress: () => console.log(t('Componentes.textoCancelar')),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK')},
                ],
              );
            }}
            color={color_primario}
          />
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Animated</Text>
        <View>
          <Animated.View
            style={{
              padding: 20,
              backgroundColor: COLORS.lightPrimary,
              opacity: fadeAnim,
            }}>
            <Text style={{fontSize: 28}}>
              {t('Componentes.textoAnimatedView')}
            </Text>
          </Animated.View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 16,
            }}>
            <Button
              title={t('Componentes.tituloBotonFadeIn')}
              onPress={fadeIn}
              color={color_primario}
            />
            <Button
              title={t('Componentes.tituloBotonFadeOut')}
              onPress={fadeOut}
              color={color_primario}
            />
          </View>
        </View>
      </View>

      <Divider bold style={{marginBottom: 40}} />

      {/* *******************************************************************************************
                                            COMPONENTES REACT NATIVE PAPER
            ******************************************************************************************* */}
      <Text style={styles.title}>{t('Componentes.tituloRNP')}</Text>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Avatar.Image</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Avatar.Image
            size={50}
            source={require('../../img/profile_icon.png')}
          />
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Avatar.Text</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Avatar.Text
            size={50}
            label="XD"
            style={{backgroundColor: color_primario}}
          />
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Badge</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Badge />
          <Badge>5</Badge>
          <Badge size={10} />
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Button</Text>
        <RNPButton
          icon="camera"
          mode="text"
          textColor={color_primario as string}
          style={{marginVertical: 10}}
          onPress={() => console.log('Pressed')}>
          {t('Componentes.tituloBoton')}
        </RNPButton>
        <RNPButton
          icon="camera"
          mode="outlined"
          textColor={color_primario as string}
          style={{marginVertical: 10}}
          onPress={() => console.log('Pressed')}>
          {t('Componentes.tituloBoton')}
        </RNPButton>
        <RNPButton
          icon="camera"
          mode="contained"
          buttonColor={color_primario as string}
          style={{marginVertical: 10}}
          onPress={() => console.log('Pressed')}>
          {t('Componentes.tituloBoton')}
        </RNPButton>
        <RNPButton
          icon="camera"
          mode="elevated"
          textColor={COLORS.lightPrimary}
          style={{marginVertical: 10}}
          onPress={() => console.log('Pressed')}>
          {t('Componentes.tituloBoton')}
        </RNPButton>
        <RNPButton
          icon="camera"
          mode="contained-tonal"
          buttonColor={COLORS.lightPrimary}
          style={{marginVertical: 10}}
          onPress={() => console.log('Pressed')}>
          {t('Componentes.tituloBoton')}
        </RNPButton>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Checkbox</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Checkbox.Android
            status={cbChecked ? 'checked' : 'unchecked'}
            onPress={() => {
              setCbChecked(!cbChecked);
            }}
            color={color_primario as string}
          />

          <Checkbox.Android status={'unchecked'} onPress={() => {}} disabled />

          <Checkbox.Android status={'checked'} onPress={() => {}} disabled />
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Chip</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Chip
            icon="information"
            onPress={() => console.log('Pressed')}
            style={{width: 100}}>
            Chip
          </Chip>
          <Chip
            disabled
            onPress={() => console.log('Pressed')}
            style={{width: 100}}>
            Chip
          </Chip>
          <Chip
            mode="outlined"
            icon="heart"
            onPress={() => console.log('Pressed')}
            style={{width: 100}}>
            Chip
          </Chip>
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>TextInput & HelperText</Text>
        <TextInput
          label="Email"
          value={textInputText}
          onChangeText={onChangeText}
        />
        <HelperText type="error" visible={hasErrors()}>
          {t('Componentes.textoHelper')}
        </HelperText>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Icon</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Icon source="camera" color={color_primario as string} size={30} />
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>ProgressBar</Text>
        <ProgressBar progress={0.5} color={color_primario as string} />
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>RadioButton</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <RadioButton
            value="first"
            status={rbChecked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setRbChecked('first')}
            color={color_primario as string}
          />
          <RadioButton
            value="second"
            status={rbChecked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setRbChecked('second')}
            color={color_primario as string}
          />
          <RadioButton
            value="third"
            status={rbChecked === 'third' ? 'checked' : 'unchecked'}
            onPress={() => setRbChecked('third')}
            color={color_primario as string}
            disabled
          />
        </View>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Searchbar</Text>
        <Searchbar
          placeholder={t('Componentes.searchBarPlaceholder')}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>SegmentedButtons</Text>
        <SegmentedButtons
          value={sbValue}
          onValueChange={setSbValue}
          buttons={[
            {
              value: 'walk',
              label: t('Componentes.segmentedButtons.caminar'),
            },
            {
              value: 'train',
              label: t('Componentes.segmentedButtons.tren'),
            },
            {
              value: 'drive',
              label: t('Componentes.segmentedButtons.manejar'),
            },
          ]}
        />
      </View>

      <Divider bold style={{marginBottom: 40}} />

      {/* *******************************************************************************************
                                            COMPONENTES PROPIOS
            ******************************************************************************************* */}
      <Text style={styles.title}>{t('Componentes.tituloCP')}</Text>

      {/* CUSTOMBUTTON:
                'title' (string) y onPress (function) son paámetros obligatorios de este componente */}
      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>CustomBotton</Text>
        <CustomButton title="CustomBotton" onPress={() => {}} />
      </View>

      {/* CALENDARIO:
            'state' (string) y 'events' (Event[]) son parámetros obligatorios de este componente */}
      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Calendario</Text>
        <Calendario
          state={calendarioData.state}
          events={calendarioData.events}
        />
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Card</Text>
        <Card style={{alignItems: 'center'}}>
          <Text style={{color: 'black'}}>{t('Componentes.textoCard')}</Text>
        </Card>
      </View>

      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>CardPerfil</Text>
        <CardPerfil title="CardPerfil" icon="id-card" onSelected={() => {}} />
      </View>

      {/* CAROUSEL:
            'data' arreglo con la información
            'renderItem' funcion que renderiza cada item con la información de data
            'keyExtractor' funcion que devuelve un string con el id del item */}
      <View style={{}}>
        <Text style={styles.subtitle}>CarouselApp</Text>
        <CarouselApp
          data={carouselData}
          renderItem={carouselRenderItem}
          keyExtractor={(item: number, index: number) => index.toString()}
        />
      </View>

      {/* <View style={styles.componentContainer}>
                <Text style={styles.subtitle}>CustomHeader</Text>
                <CustomHeader navigation={{}} />
            </View> */}
      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Input</Text>
        <Input
          placeholder={t('Componentes.inputPlaceholder')}
          textValue={inputValue}
          onChangeText={setInputValue}
          btnColor="black"
          btnTitle={t('Componentes.tituloBotonSubmit')}
          onPressBtn={() => {}}
        />
      </View>

      {/* NOTIFICATION ITEM
                'item'
                'onSelected' function que se ejecuta cuando se selecciona el item */}
      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>NotificationItem</Text>
        <NotificationItem
          item={notificationItemData}
          onSelected={onPressNotificationItem}
        />
      </View>

      {/* MODALS:
            'modalVisible' (booleano) determina si el modal está visible o no
            'animation' (string) determina el tipo de animación del modal
            'onPressBtnAccept' (function) determina la acción del botón aceptar
            'onPressBtnCancel' (function) determina la acción del botón cancelar*/}
      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>Modals</Text>
        <CustomButton
          title={t('Componentes.tituloBotonModal')}
          onPress={() => setModalVisible(true)}
        />
        <Modals
          title={t('Componentes.tituloModal')}
          textDetailModal={t('Componentes.textoDetalleModal')}
          modalVisible={modalVisible}
          animation="fade"
          onPressBtnAccept={() => setModalVisible(false)}
          onPressBtnCancel={() => setModalVisible(false)}
        />
      </View>

      {/* CUSTOM TAB BAR ICON:
            'iconName' (string) determina el nombre del ícono
            'focused' (boolean) determina si el ícono está seleccionado o no */}
      <View style={styles.componentContainer}>
        <Text style={styles.subtitle}>CustomTabBarIcon</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <CustomTabBarIcon iconName={'home'} focused={true} />
          <CustomTabBarIcon iconName={'car-outline'} focused={true} />
          <CustomTabBarIcon iconName={'calendar'} focused={true} />
          <CustomTabBarIcon iconName={'heart-outline'} focused={true} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ComponentsScreen;
