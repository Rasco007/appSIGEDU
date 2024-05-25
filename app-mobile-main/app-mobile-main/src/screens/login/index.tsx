// Importación de librerías y componentes necesarios de React y React Native.
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  TextInput as TextInputP,
} from 'react-native-paper';
import {ContextLogin} from '../../context/AuthContextLog';
import AppStyles from './styles';
import {encryptedAES} from '../../helpers/encryptAES';
import { apiFrmwk, myHeaders, storeToken} from '../../services/api';
import {AppContext} from '../../context/ClienteContex';
import {LanguageSwitcher} from '../../components';
import {i18next} from '../../config/i18next.config';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome6';
import {SelectList} from 'react-native-dropdown-select-list';
import {COLORS} from '../../constants';
import {dato, interIdioma} from '../clienteScreen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useDialog} from '../../context/DialogContext';
import {split} from 'lodash';
import Config from 'react-native-config';
import AppLoader from '../../components/appLoader';
import useAuthStore from '../../store/auth/authStore';
// Definición del tipo de las props.
type Props = {
  navigation: any;
  route: any;
};

const LoginScreen: React.FC<Props> = ({navigation, route}) => {
  // Obtención del estado y el despachador del contexto de la aplicación.
  const {state, dispatch} = useContext(AppContext);
  // Extracción de datos
  const {logo, idiomas, idioma_seleccionado, cookie, color_primario} =
    state.cliente;
  // Configuración de la función de traducción.
  const {t} = useTranslation();
  // Estados locales para manejar el usuario, la contraseña y la visibilidad de la contraseña.
  const [c_usuario, setUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {setTitulo, setMensaje, setVisible} = useDialog();
  const [loading, setLoading] = useState<boolean>(false);
  // Función para cambiar el idioma.
  const handleChangeLanguage = useCallback(
    (language: string) => {
      const datosCliente = {
        idiomas: idiomas,
        idioma_seleccionado: language,
      };
      dispatch({type: 'SET_CLIENTE', payload: datosCliente});
      i18next.changeLanguage(language.toLowerCase());
    },
    [dispatch, idiomas],
  );

  useEffect(() => {
    fetchCliente();
  }, []);

  // Función para manejar la pulsación del botón de inicio de sesión.
  const handleViewPress = () => {
    try {
      if (!c_usuario || !pass) {
        setTitulo('Login.tituloError');
        setMensaje('Login.camposIncompletos');
        setVisible(true);
        return;
      }
      fetchData();
    } catch (error) {
      console.error('Error de conexión al backend: ' + error);
    }
  };
  // Extracción de datos específicos del contexto de autenticación.
  // const {signIn} = useContext(ContextLogin);

  //se cambia por el manejador de estados zustand
  const { signIn } = useAuthStore();
  // Función para realizar la solicitud de inicio de sesión.
  const fetchData = async () => {
    setLoading(true);
    try {
      const tUsuario = c_usuario.trim();
      const tPass = pass.trim();
      // Encriptación de usuario y contraseña
      const userEncrypt = encryptedAES(tUsuario);
      const passEncrypt = encryptedAES(tPass);

      // Creación de formData con credenciales encriptadas.
      const formData = new FormData();
      formData.append('user', userEncrypt);
      formData.append('password', passEncrypt);

      // const api = axios.create(apiConfig);
      // let response = await api.post('/framework/iniciarSesion', formData);

      let response = await apiFrmwk.post('/framework/iniciarSesion', formData);
      const {state, usuario, menus} = response.data;
   
      
      if (state == 'OK') {

        let data = response.data;
        // obtiene las cookies del backend tdi y setea al backend cliente
        storeToken(response.headers['accesstoken']);
        const noticiasCliente = {
          visible: true,
        };
        dispatch({type: 'SET_NOTICIAS', payload: noticiasCliente});
        
        // apiConfigClient.baseURL = usuario.d_url_endpoint_cliente;
        // apiConfigClient.baseURL = `${Config.LOCALHOST}:5002/sistema`;

        // const apiClient = axios.create(apiConfigClient);
        // let responseClient = await apiClient.post('/framework/token', formData);
        const {id_alumno, lastName} = usuario;
        console.log(id_alumno,"as");
        const datosUsuario = {
          estado: usuario.state,
          mensaje: usuario.mensaje,
          c_usuario: usuario.c_usuario,
          id_alumno: id_alumno,
          nombre: usuario.nombre,
          apellido: lastName,
          perfiles: usuario.perfiles,
        };

        dispatch({type: 'SET_USUARIO', payload: datosUsuario});
        const datosMenu = menus;
        dispatch({type: 'SET_MENUS', payload: datosMenu});

        signIn(usuario.nombre);
      } else {
        setLoading(false);
        setTitulo('Login.tituloError');
        setMensaje('Login.credIncorrectas');
        setVisible(true);
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error al realizar la solicitud1: ', error);
    }
  };

  // Manejadores de cambios en el usuario y la contraseña.
  const handleUsuarioChange = (text: string) => {
    setUsuario(text);
  };
  const handlePassChange = (text: string) => {
    setPass(text);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleBackPress = () => {
    navigation.goBack();
    dispatch({type: 'CLEAR_CLIENTE', payload: {}});
  };

  // Estilos de la aplicación.
  const styles = AppStyles();
  // Estado local para manejar la visibilidad del selector de idiomas.
  const [isSelectVisible, setIsSelectVisible] = useState(true);

  // Efecto secundario que se ejecuta después de que el componente se monta.
  useEffect(() => {
    // Configuración del idioma si solo hay uno disponible.
    if (idiomas!.length === 1) {
      i18next.changeLanguage(idiomas![0]);
      const datosCliente = {
        idiomas: idiomas,
        idioma_seleccionado: idiomas![0],
      };
      dispatch({type: 'SET_CLIENTE', payload: datosCliente});
    } else {
      // Configuración del idioma predeterminado si no está en la lista de idiomas disponibles.
      if (idiomas!.includes(idioma_seleccionado!)) {
        const datosCliente = {
          idiomas: idiomas,
          idioma_seleccionado: 'ES',
        };
        dispatch({type: 'SET_CLIENTE', payload: datosCliente});
        i18next.changeLanguage('es');
      }
    }

    // Manejo de la visibilidad del selector de idiomas al mostrar/ocultar el teclado.
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsSelectVisible(false);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsSelectVisible(true);
      },
    );

    // Limpieza de los listeners al desmontar el componente.
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [dispatch, idiomas, idioma_seleccionado]);

  /////////////////////////////////--- clientes ---///////////////////////////////////
  const [clientes, setClientes] = useState();
  const toggleModal = () => {
    // fetchCliente();
    setModalVisible(!isModalVisible);
  };
  const handleClientChange = (text: any) => {
    consultaCliente(text);
    setModalVisible(!isModalVisible);
  };

  const consultaCliente = async (text: any) => {
    const formData = new FormData();
    formData.append('id_cliente', text);
    let response = await apiFrmwk
      .post('/framework/getDataCliente', formData)

      .then(response => {
        // const datos = response.data;
        const datos = response.data.datos;
        const datosCliente = {
          estado: response.data.state,
          mensaje: 'Cliente válido',
          c_cli: datos.c_cli,
          url_endpoint: datos.d_url_endpoint,
          logo: datos.d_logo,
          color_primario: datos.d_color_primario,
          color_secundario: datos.d_color_secundario,
          idiomas: datos.idiomas.map((idioma: interIdioma) => idioma.c_idioma),
        };

        myHeaders.cli = datos.c_cli;

        dispatch({type: 'SET_CLIENTE', payload: datosCliente});
        navigation.navigate('Login');
      })
      .catch(error => console.error('Datos no encontrados.' + error));
  };
  const fetchCliente = async () => {
    try {
      let response = await apiFrmwk
        .get('/framework/getConsultaCliente')
        .then(response => {
          const clientesFormateado = response.data.datos.map((datos: dato) => ({
            key: datos.id_cliente,
            value: datos.d_cliente,
          }));
          const headerOptions = {
            header: 'Opción',
            items: clientesFormateado,
          };

          setClientes(clientesFormateado);
        })
        .catch(error => console.error('Cliente inexistente.' + error));
    } catch (error) {
      console.error('Error al realizar la solicitud: ', error);
    }
  };
  /////////////////////////////////--- clientes ---///////////////////////////////////
  // Estructura del componente.
  return (
    <>
      <StatusBar backgroundColor={color_primario}></StatusBar>
      <View style={styles.container}>
        <View
          style={{
            zIndex: 20,
          }}>
          {clientes && (
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                position: 'absolute',
                top: 30,
                left: 15,
                borderWidth: 1.5,
                borderColor: 'gray',
                padding: 5,
                borderRadius: 50,
              }}>
              <Icon name={'business'} size={23} color={COLORS.darkGray} />
              <IconF name="arrows-rotate" size={15} color={COLORS.darkGray} />
            </TouchableOpacity>
          )}
          {/* Selector de idiomas si hay más de uno disponible. */}
          {idiomas!.length > 1 && (
            <LanguageSwitcher
              languages={idiomas}
              languageSelected={idioma_seleccionado}
              onChangeLanguage={handleChangeLanguage}
            />
          )}
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.subcontainer}>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <View style={styles.modalView}>
                <View style={styles.modalheader}>
                  <Icon name={'business'} size={40} color={COLORS.darkGray} />
                </View>
                <View style={styles.containerSelect}>
                  <SelectList
                    setSelected={(val: any) => handleClientChange(val)}
                    data={clientes!}
                    save="key"
                    placeholder="Seleccionar cliente"
                    search={false}
                    boxStyles={{
                      borderEndColor: 'none',
                      borderRadius: 20,
                      backfaceVisibility: 'hidden',
                      borderBottomColor: COLORS.lightGray, // Define el color del borde inferior
                      borderBottomWidth: 0,
                      borderTopWidth: 0,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                    }}
                    dropdownStyles={{
                      borderBottomWidth: 0,
                      borderTopWidth: 0,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                    }}
                    arrowicon={
                      <Icon name="chevron-down" size={15} color="#333" />
                    }
                  />
                </View>
              </View>
            </Modal>

            {/* <BackButton onPress={toggleModal} /> */}

            {/* Logo de la aplicación. */}
            <Animated.View
              style={styles.containerLogo}
              entering={FadeInDown.duration(1000).springify()}>
              <Image
                source={{uri: `data:image/png;base64,${logo}`}}
                style={{
                  width: 200,
                  height: 150,
                  zIndex: 5,
                  justifyContent: 'center',
                  resizeMode: 'contain', // Cambiado a 'contain'
                }}
              />
            </Animated.View>
            {/* Formulario de inicio de sesión. */}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.containerScroll}>
              <Animated.View entering={FadeInDown.duration(2000).springify()}>
                <Text style={styles.textLog}>{t('Login.titulo')}</Text>
                <Text style={styles.textSecondaryLog}>
                  {t('Login.mensaje')}
                </Text>
                <TextInputP
                  value={c_usuario}
                  style={{
                    backgroundColor: 'transparent',
                    marginTop: 30,
                    color: COLORS.lightGray,
                  }}
                  label={t('Login.usuario')}
                  onChangeText={handleUsuarioChange}
                  autoCorrect={false}
                  mode="outlined"
                  autoCapitalize="none"
                />
                <TextInputP
                  style={{
                    backgroundColor: 'transparent',
                    marginBottom: 20,
                    marginTop: 20,
                    color: COLORS.lightGray,
                  }}
                  label={t('Login.contrasena')}
                  value={pass}
                  onChangeText={handlePassChange}
                  autoCorrect={false}
                  autoCapitalize="none"
                  mode="outlined"
                  secureTextEntry={!isPasswordVisible}
                  right={
                    <TextInputP.Icon
                      onPress={togglePasswordVisibility}
                      icon={isPasswordVisible ? 'eye' : 'eye-off'}
                    />
                  }
                />

                {/* Input para la contraseña con opción de visibilidad. */}
                <View style={{marginTop: 25, marginBottom: 0}}>
                  <Button
                    mode="contained"
                    onPress={handleViewPress}
                    labelStyle={{fontSize: 18}}
                    style={{marginTop: 0, padding: 5, borderRadius: 15}}>
                    {t('Login.boton')}
                  </Button>
                </View>
                {/* Botón de inicio de sesión. */}
              </Animated.View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {loading && <AppLoader />}
    </>
  );
};

// Exportación del componente.
export default LoginScreen;
