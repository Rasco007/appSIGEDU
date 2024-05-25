import React, {useContext} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AppStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {ExamenesCards, ProxExamDetCursCards} from '../../components';
import axios from 'axios';
import {apiClient} from '../../services/api';
import {isEmpty} from 'lodash';
import {useDialog} from '../../context/DialogContext';
import {AppContext} from '../../context/ClienteContex';
import IconoEstado from './customIconEstado';

type HomeProps = {
  navigation: any;
  route: any;
};

const DetalleCursoScreen: React.FC<HomeProps> = ({navigation, route}) => {
  const styles = AppStyles();
  const {state, handleLogout} = useContext(AppContext);
  const {usuario} = state.cliente;
  const {id_alu_cur} = route.params;
  const {setTitulo, setMensaje, setVisible} = useDialog();
  const [detalleCurso, setDetalleCurso] = React.useState();
  const [proxExamenes, setProxExamenes] = React.useState([]);
  const [examenesAprob, setExamenesAprob] = React.useState([]);
  const [cargandoDetalle, setCargandoDetalle] = React.useState(true);
  const [cargandoProximosExamenes, setCargandoProximosExamenes] = React.useState(true);
  const [cargandoExamenesAprobados, setCargandoExamenesAprobados] = React.useState(true);

  const obtenerDetalleCurso = async () => {
    try {
      // const apiClient = axios.create(apiConfigClient);
      const formDetalleCurso = new FormData();
      formDetalleCurso.append('id_alu_cur', id_alu_cur);
      let responseClient = await apiClient.post(
        '/obtenerDetalleCurso',
        formDetalleCurso,
      );

      if (!isEmpty(responseClient)) {
        setDetalleCurso(responseClient.data.result);
      } else {
        setTitulo('generales.tituloError');
        setMensaje('Ocurrio un error al intentar obtener el detalle del curso');
        setVisible(true);
      }
    } catch (error: any) {
      if (error.response.status != 401) {
        setTitulo('generales.tituloError');
        setMensaje(error.toString());
        setVisible(true);
      }
    }
    setCargandoDetalle(false);
  };

  const obtenerProximosExamenes = async () => {
    try {
      // const apiClient = axios.create(apiConfigClient);
      const formExamenes = new FormData();
      formExamenes.append('id_alu_cur', id_alu_cur);
      let responseClient = await apiClient.post(
        '/obtenerProximosExamenes',
        formExamenes,
      );

      if (!isEmpty(responseClient)) {
        setProxExamenes(responseClient.data.result);
      } else {
        setTitulo('generales.tituloError');
        setMensaje(
          'Ocurrio un error al intentar obtener los Próximos Exámenes',
        );
        setVisible(true);
      }
    } catch (error: any) {
      if (error.response.status != 401) {
        setTitulo('generales.tituloError');
        setMensaje(error.toString());
        setVisible(true);
      }
    }
    setCargandoProximosExamenes(false);
  };

  const obtenerExamenesRendidos = async () => {
    try {
      // const apiClient = axios.create(apiConfigClient);
      const formExamenesAprob = new FormData();
      formExamenesAprob.append('id_alumno', usuario?.id_alumno);
      formExamenesAprob.append('id_alu_cur', id_alu_cur);
      let responseClient = await apiClient.post(
        '/obtenerExamenesRendidos',
        formExamenesAprob,
      );

      if (!isEmpty(responseClient)) {
        setExamenesAprob(responseClient.data.result);
      } else {
        setTitulo('generales.tituloError');
        setMensaje('Ocurrio un error al intentar obtener los Exámenes');
        setVisible(true);
      }
    } catch (error: any) {
      if (error.response.status != 401) {
        setTitulo('generales.tituloError');
        setMensaje(error.toString());
        setVisible(true);
      }
    }
    setCargandoExamenesAprobados(false);
  };

  React.useEffect(() => {
    setCargandoDetalle(true);
    setCargandoProximosExamenes(true);
    setCargandoExamenesAprobados(true);
    obtenerDetalleCurso();
    obtenerProximosExamenes();
    obtenerExamenesRendidos();
  }, [id_alu_cur]);

  return (
    <>
      {cargandoDetalle || cargandoExamenesAprobados || cargandoProximosExamenes ? (
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
            <Text style={styles.title}>{detalleCurso.curso}</Text>
          </View>
          <View style={styles.componentsContainer}>
            <ScrollView
              contentContainerStyle={{margin: 15}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  gap: 10,
                  marginBottom: 25,
                }}>
                <View style={styles.dato}>
                  <Icon
                    name="calendar"
                    size={20}
                    color={styles.color_primario}
                  />
                  <Text style={styles.texto}>{detalleCurso.periodo}</Text>
                </View>
                <View style={styles.dato}>
                  <Icon name="people" size={20} color={styles.color_primario} />
                  <Text style={styles.texto}>{detalleCurso.profesores}</Text>
                </View>
                {/* <FlatList
                data={detalleCurso.horario}
                scrollEnabled={false}
                renderItem={({item}) => (
                  <View style={{...styles.dato, width: '80%'}}>
                    <Icon
                      name="clock"
                      size={20}
                      color={styles.color_primario}
                    />
                    <Text style={styles.texto}>{item.horario}</Text>
                  </View>
                )}
                keyExtractor={(item: any) => item.horario}
              /> */}
                <View style={styles.dato}>
                  <Icon name="time" size={20} color={styles.color_primario} />
                  <Text style={styles.texto}>{detalleCurso.horario}</Text>
                </View>

                <IconoEstado estado={detalleCurso.estado} />
              </View>
              <View style={{flex: 1, marginBottom: 20}}>
                <ExamenesCards
                  data={examenesAprob}
                  navigation={navigation}
                  nombreCurso={detalleCurso.curso}
                />
                <ProxExamDetCursCards data={proxExamenes} />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default DetalleCursoScreen;
