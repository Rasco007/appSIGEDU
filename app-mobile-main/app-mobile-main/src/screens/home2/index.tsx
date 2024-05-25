import React, {useContext, useState} from 'react';
import {View, Text, ActivityIndicator, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import AppStyles from './styles';
import Orientation from 'react-native-orientation-locker';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {
  MisClasesHoyCards,
  ModalNoticias,
  ProximosExamenesCards,
} from '../../components';
import {AppContext} from '../../context/ClienteContex';
import {useDialog} from '../../context/DialogContext';
import axios from 'axios';
import {apiClient} from '../../services/api';
import {isEmpty} from 'lodash';
import {CarouselApp} from '../../components/index';

type HomeProps = {
  navigation: any;
  route: any;
};

const Home2: React.FC<HomeProps> = ({navigation, route}) => {
  const {t} = useTranslation();

  const misClasesWidth = Dimensions.get('window').width - 29; // 29 = styles.cardsContainer.marginStart + styles.misClases.paddingRight

  const {state, dispatch, handleLogout} = useContext(AppContext);
  const {noticia, usuario} = state.cliente;
  const styles = AppStyles();
  const {setTitulo, setMensaje, setVisible} = useDialog();
  const [clasesHoy, setClasesHoy] = React.useState([]);
  const [proxExamenes, setProxExamenes] = React.useState([]);
  const [noticiaActual, setNoticiaActual] = React.useState();
  const [showAlert, setShowAlert] = useState(noticia.visible);

  const [cargando, setCargando] = React.useState({
    clases: true,
    examenes: true,
  });

  const onCloseModal = () => {
    const noticiasCliente = {
      visible: false,
    };
    dispatch({type: 'SET_NOTICIAS', payload: noticiasCliente});
    setShowAlert(false);
  };

  const obtenerClasesHoy = async () => {
    try {

      const formClases = new FormData();
      formClases.append('id_alumno', usuario?.id_alumno);
      let responseClient = await apiClient.post(
        '/obtenerClasesHoy',
        formClases,
      );

      if (!isEmpty(responseClient)) {
        setClasesHoy(responseClient.data.result);
      } else {
        setTitulo('generales.tituloError');
        setMensaje('Ocurrio un error al intentar obtener las Clases de Hoy');
        setVisible(true);
      }
      setCargando((v: any) => ({...v, clases: false}));
    } catch (error: any) {
  
      if (error.response.status != 401) {
        setTitulo('generales.tituloError');
        setMensaje(error.toString());
        setVisible(true);
      }
    }
  };

  const obtenerTodosProximosExamenes = async () => {
    try {
    
      const formExamenes = new FormData();
      formExamenes.append('id_alumno', usuario?.id_alumno);
      let responseClient = await apiClient.post(
        '/obtenerTodosProximosExamenes',
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

      setCargando((v: any) => ({...v, examenes: false}));
    } catch (error: any) {
 
      if (error.response.status != 401) {
        setTitulo('generales.tituloError');
        setMensaje(error.toString());
        setVisible(true);
      }
    }
  };

  const obtenerNoticia = async () => {
    try {


      let responseClient = await apiClient.get('/obtenerNoticia');

      if (!isEmpty(responseClient)) {
        setNoticiaActual(responseClient.data.result);
      } else {
        setTitulo('generales.tituloError');
        setMensaje('Ocurrio un error al intentar la noticia de la institución');
        setVisible(true);
      }

      //setCargando((v: any) => ({...v, examenes: false}));
    } catch (error: any) {
  
      if (error.response.status != 401) {
        setTitulo('generales.tituloError');
        setMensaje(error.toString());
        setVisible(true);
      }
    }
  };

  React.useEffect(() => {
    Orientation.lockToPortrait();
    obtenerNoticia();
    obtenerClasesHoy();
    obtenerTodosProximosExamenes();
  }, []);

  const transformarFecha = (fecha: string) => {
    const partes = fecha.split('-');
    const anio = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}/${mes}/${anio}`;
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    let titulo;
    if (index == 6) titulo = 'Clases de ayer';
    else if (index == 7) titulo = t('home.misClasesHoy');
    else if (index == 8) titulo = 'Clases de mañana';
    else titulo = `Clases del ${transformarFecha(item)}`;

    return (
      <View style={{width: misClasesWidth}}>
        <MisClasesHoyCards
          data={clasesHoy[item]}
          navigation={navigation}
          route={route}
          titulo={titulo}
        />
      </View>
    );
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <View style={styles.container}>
      {noticiaActual && (
        <ModalNoticias
          isVisible={showAlert}
          onClose={onCloseModal}
          url_noticia={noticiaActual.d_url}
        />
      )}

      <Text style={styles.title}>{t('home.saludo')}</Text>
      <Text style={styles.subtitle}>
        {usuario?.apellido}, {usuario?.nombre}
      </Text>

      {cargando.clases || cargando.examenes ? (
        <ActivityIndicator
          animating={true}
          size={100}
          color={styles.color_primario}
        />
      ) : (
        <View style={styles.cardsContainer}>
          <View style={styles.misClases}>
            <CarouselApp
              data={Object.keys(clasesHoy)}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              initialIndex={7}
              objectDimension={misClasesWidth}
            />
          </View>

          <View style={styles.proximosExamenes}>
            <ProximosExamenesCards data={proxExamenes} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Home2;
