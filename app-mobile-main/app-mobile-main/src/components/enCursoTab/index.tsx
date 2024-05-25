import React, {useContext} from 'react';
import {ActivityIndicator, ColorValue, View} from 'react-native';
import EnCursoCards from '../enCursoCards';

import axios from 'axios';
import {apiClient} from '../../services/api';
import AppStyles from './styles';
import {COLORS} from '../../constants/themes/colors';
import {AppContext} from '../../context/ClienteContex';

type HomeProps = {
  navigation: any;
  route: any;
  carrera: any;
};

const materiasCarrera = new Map();

const EnCursoTab: React.FC<HomeProps> = ({navigation, route, carrera}) => {
  const styles = AppStyles();
  const {state} = useContext(AppContext);
  const {usuario} = state.cliente;

  let color_primario: ColorValue | string | undefined =
    styles.color_primario === undefined
      ? (COLORS.primary as ColorValue)
      : (styles.color_primario as ColorValue);

  const [cargando, setCargando] = React.useState(true);
  const [materiasEC, setMateriasEC] = React.useState([]);

  const traerEnCurso = async () => {
    try {
      const formData = new FormData();
      formData.append('id_alumno', usuario?.id_alumno);
      formData.append('c_carrera', carrera);

      // const apiClient = axios.create(apiConfigClient);
      let responseClient = await apiClient.post('/getEnCurso', formData);

      setMateriasEC(responseClient.data.result);
      materiasCarrera.set(carrera, responseClient.data.result);
      setCargando(false);
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
    }
  };

  React.useEffect(() => {
    if (materiasCarrera.has(carrera)) {
      setMateriasEC(materiasCarrera.get(carrera));
    } else {
      setCargando(true);
      traerEnCurso();
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
          <EnCursoCards
            data={materiasEC}
            navigation={navigation}
            route={route}
          />
        </View>
      )}
    </>
  );
};

export default EnCursoTab;
