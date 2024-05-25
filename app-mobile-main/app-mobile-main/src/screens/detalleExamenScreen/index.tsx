import React, {useContext} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AppStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {apiClient} from '../../services/api';
import {isEmpty} from 'lodash';
import {useDialog} from '../../context/DialogContext';
import {AppContext} from '../../context/ClienteContex';
import IconoEstado from './customIconEstado';

type DetalleExamen = {
  navigation: any;
  route: any;
};

const DetalleExamenScreen: React.FC<DetalleExamen> = ({navigation, route}) => {
  const styles = AppStyles();
  const {state, handleLogout} = useContext(AppContext);
  const {usuario} = state.cliente;
  const {id_libreta} = route.params;
  const {nombre_curso} = route.params;
  const {setTitulo, setMensaje, setVisible} = useDialog();
  const [detalleExamen, setdetalleExamen] = React.useState();

  const [cargando, setCargando] = React.useState(true);

  const obtenerdetalleExamen = async () => {
    try {
      // const apiClient = axios.create(apiConfigClient);
      const formdetalleExamen = new FormData();
      formdetalleExamen.append('id_libreta', id_libreta);
      let responseClient = await apiClient.post(
        '/obtenerDetalleEvaluacion',
        formdetalleExamen,
      );

      if (!isEmpty(responseClient)) {
        setdetalleExamen(responseClient.data.result);
      } else {
        setTitulo('generales.tituloError');
        setMensaje(
          'Ocurrio un error al intentar obtener el detalle del Examen',
        );
        setVisible(true);
      }
      setCargando(false);
    } catch (error: any) {
  
      if (error.response.status != 401) {
        setTitulo('generales.tituloError');
        setMensaje(error.toString());
        setVisible(true);
      }
    }
  };

  React.useEffect(() => {
    setCargando(true);
    obtenerdetalleExamen();
  }, [id_libreta]);

  return (
    <>
      {cargando ? (
        <View style={{...styles.container, justifyContent: 'center'}}>
          <ActivityIndicator
            animating={true}
            size={100}
            color={styles.color_primario}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 12,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-back-circle"
                size={30}
                color={styles.color_primario}
                style={{marginTop: 5, marginRight: 5}}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{nombre_curso}</Text>
          </View>
          <View style={styles.componentsContainer}>
            <ScrollView contentContainerStyle={{margin: 15}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  gap: 10,
                  marginBottom: 20,
                }}>
                <View style={styles.dato}>
                  <Icon
                    name="information-circle"
                    size={20}
                    color={styles.color_primario}
                  />
                  <Text style={styles.texto}>{detalleExamen.instancia}</Text>
                </View>
                {detalleExamen.fecha && 
                <View style={styles.dato}>
                  <Icon
                    name="calendar"
                    size={20}
                    color={styles.color_primario}
                  />
                  <Text style={styles.texto}>{detalleExamen.fecha}</Text>
                </View>
                }
                {detalleExamen.lugar && 
                <View style={styles.dato}>
                  <Icon
                    name="location"
                    size={20}
                    color={styles.color_primario}
                  />
                  <Text style={styles.texto}>{detalleExamen.lugar}</Text>
                </View>
                }
                <IconoEstado estado={detalleExamen.estado} />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default DetalleExamenScreen;
