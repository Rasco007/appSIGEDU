import * as React from 'react';
import {useContext} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {TabView, TabBar} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppStyles from './styles';
import {COLORS} from '../../constants/themes/colors';
import EnCursoTab from '../../components/enCursoTab';
import HistorialTab from '../../components/historialTab';
import axios from 'axios';
import {apiClient} from '../../services/api';
import {AppContext} from '../../context/ClienteContex';

type HomeProps = {
  navigation: any;
  route: any;
  carrera: any;
};

const AcademicoScreen: React.FC<HomeProps> = ({navigation, route}) => {
  const styles = AppStyles();
  const {t} = useTranslation();

  let color_primario: ColorValue | string | undefined =
    styles.color_primario === undefined
      ? (COLORS.primary as ColorValue)
      : (styles.color_primario as ColorValue);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'enCurso', title: t('academico.enCurso')},
    {key: 'historial', title: t('academico.historial')},
  ]);

  const [cargando, setCargando] = React.useState(true);
  const [carreras, setCarreras] = React.useState([]);
  const [carrera, setCarrera] = React.useState();

  const {state} = useContext(AppContext);
  const {color_texto} = state.cliente;
  const STORAGE_KEY = `@miApp:ultimaCarrera:${state.cliente.c_cli}`;
  const {usuario} = state.cliente;

  const renderScene = ({navigation, route, carrera}: HomeProps) => {
    switch (route.key) {
      case 'enCurso':
        return (
          <EnCursoTab navigation={navigation} route={route} carrera={carrera} />
        );
      case 'historial':
        const promedio = carreras.find((c: any) => c.value === carrera)?.promedio;
        return (
          <HistorialTab navigation={navigation} route={route} carrera={carrera} promedio={promedio}/>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: color_primario}}
      labelStyle={{color: color_primario}}
      style={{backgroundColor: '#fff'}}
    />
  );

  const traerCarrerasAlumno = async (seteada: boolean) => {
    try {
      const formData = new FormData();
      formData.append('id_alumno', usuario?.id_alumno);

    // ya no hace falta declarar. en la config de axios se setea todo.
      // const apiClient = axios.create(apiConfigClient);

      let responseClient = await apiClient.post('/getCarreras', formData);

      setCarreras(responseClient.data.result);

      if (!seteada) setCarrera(responseClient.data.result[0].value);

      setCargando(false);
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
    }
  };

  const traerUltimaCarrera = async () => {
    try {
      const estadoClienteString = await AsyncStorage.getItem(STORAGE_KEY);

      let seteada = false;
      if (estadoClienteString != undefined && estadoClienteString != null) {
        setCarrera(estadoClienteString);
        seteada = true;
      }

      await traerCarrerasAlumno(seteada);
    } catch (error) {
      console.error(
        'Error al cargar el estado del cliente desde AsyncStorage:',
        error,
      );
    }
  };

  const guardarUltimaCarrera = async (carreraSeleccionada: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, carreraSeleccionada);
    } catch (error) {
      console.error(
        'Error al guardar el estado del cliente en AsyncStorage:',
        error,
      );
    }
  };

  const cambiarCarrera = async (carreraSeleccionada: any) => {
    setCarrera(carreraSeleccionada);
    guardarUltimaCarrera(carreraSeleccionada);
  };

  React.useEffect(() => {
    traerUltimaCarrera();
  }, []);

  return (
    <>
      {cargando ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            animating={true}
            size={100}
            color={color_primario}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('academico.titulo')}</Text>

            <View style={styles.pickerSelect}>
              <RNPickerSelect
                onValueChange={value => cambiarCarrera(value)}
                items={carreras}
                value={carrera}
                placeholder={{}}
                disabled={carreras != undefined && carreras.length < 2}
                style={{
                  inputIOS: {
                    color: color_texto,
                  },
                  inputAndroid: {
                    color: color_texto,
                  },
                }}
              />
            </View>
          </View>

          <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={({route}) => renderScene({route, navigation, carrera})}
            onIndexChange={setIndex}
          />
        </View>
      )}
    </>
  );
};

export default AcademicoScreen;
