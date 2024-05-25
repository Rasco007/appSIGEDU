import React, {useContext} from 'react';
import {View, ActivityIndicator, ColorValue} from 'react-native';

import axios from 'axios';

import HistorialCards from '../historialCards';
import {apiClient} from '../../services/api';
import AppStyles from './styles';
import {COLORS} from '../../constants/themes/colors';
import {AppContext} from '../../context/ClienteContex';

type HomeProps = {
  navigation: any;
  route: any;
  carrera: any;
  promedio: number;
};

const materiasCarrera = new Map();

const HistorialTab: React.FC<HomeProps> = ({navigation, route, carrera, promedio}) => {
  const styles = AppStyles();
  const {state} = useContext(AppContext);
  const {usuario} = state.cliente;

  let color_primario: ColorValue | string | undefined =
    styles.color_primario === undefined
      ? (COLORS.primary as ColorValue)
      : (styles.color_primario as ColorValue);

  const [cargando, setCargando] = React.useState(true);
  const [historial, setHistorial] = React.useState([]);

  const traerHistorial = async () => {
    try {
      const formData = new FormData();
      formData.append('id_alumno', usuario?.id_alumno);
      formData.append('c_carrera', carrera);

      // const apiClient = axios.create(apiConfigClient);
      let responseClient = await apiClient.post('/getHistorial', formData);

      setHistorial(responseClient.data.result);
      materiasCarrera.set(carrera, responseClient.data.result);
      setCargando(false);
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
    }
  };

  React.useEffect(() => {
    if (materiasCarrera.has(carrera)) {
      setHistorial(materiasCarrera.get(carrera));
    } else {
      setCargando(true);
      traerHistorial();
    }
  }, [carrera]);

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
        <View>
          <HistorialCards
            data={historial}
            navigation={navigation}
            route={route}
            promedio={promedio}
          />
        </View>
      )}
    </>
  );
};

export default HistorialTab;
