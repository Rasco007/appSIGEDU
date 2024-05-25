import React, { useContext, useEffect, useState, Suspense } from 'react';
import {
  View,
  Image,
  StatusBar,

} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';
import { SelectList } from 'react-native-dropdown-select-list';
import { apiFrmwk } from '../../services/api';
import { AppContext } from '../../context/ClienteContex';
import { COLORS } from '../../constants';
import AppLoader from '../../components/appLoader';
import { useDialog } from '../../context/DialogContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
const STORAGE_KEY = '@miApp:estadoCliente';
type Props = {
  navigation: any;
  route: any;
};
export interface dato {
  id_cliente: string;
  d_cliente: string;
}
export interface interIdioma {
  c_idioma: string;
}
const ClienteScreen: React.FC<Props> = ({ navigation, route }) => {
  const { dispatch } = useContext(AppContext);

  const [clientes, setClientes] = useState();
  const { state } = useContext(AppContext);
  const { c_cli, idiomas, color_primario } = state.cliente;
  const { setTitulo, setMensaje, setVisible } = useDialog();
  
  useEffect(() => {
    try {
      fetchCliente();

    } catch (error) {
      // console.error('Error cliente:', error);
      setTitulo('Error cliente');
      setMensaje(`${error}`);
      setVisible(true);

    }
  }, []);

  useEffect(() => {

    if (state.cliente.url_endpoint) {

      navigation.navigate('Login', {
        clientesAll: clientes,
      });

      // navigation.navigate('Login');
    }
  }, [state.cliente]);

  const handleClientChange = (text: any) => {
    consultaCliente(text);
  };
  const function_error = (title: string, error: any) => {
    setTitulo(title);
    setMensaje(`${error}`);
    setVisible(true);
  }
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
        // console.log(datos.d_url_endpoint,"saaaaaaaaaaaaaaaaaaa");

        // storeBackUrlClient(datos.d_url_endpoint)
        //  AsyncStorage.setItem('base_url_cliente', datos.d_url_endpoint);



        // myHeaders.cli = datos.c_cli;
        // storeCLI(datos.c_cli)
        AsyncStorage.setItem('CLI', datos.c_cli)

        dispatch({ type: 'SET_CLIENTE', payload: datosCliente });
        navigation.navigate('Login');
      })
      // .catch(error => function_error ('Datos no encontrados',error));}
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
      // .catch(error => function_error('Datos no encontrados.' , error));
      // .catch(error => console.error('Cliente inexistentee.' + error));

    } catch (error) {
      // console.error('Error al realizar la solicitud: ', error);
      // setTitulo('Error al realizar la solicitud');
      // setMensaje(`${error}`);
      // setVisible(true);
      // console.error('Error al realizar la solicitud: ', error);

      // setLoading(false)
    }
  };

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.darkGray}></StatusBar>
      <Suspense fallback={
        <AppLoader />
      }>

        <View style={styles.subcontainer}>
          <View style={styles.containerLogo}>
            <Image
              style={{ width: 300, height: 80, resizeMode: 'contain' }} // Ajusta el tamaño de la imagen
              source={require('../../img/logo_sigedu_mobile_grande.png')}
            />

            {/* <Image
              source={{uri: `data:image/png;base64,${logo}`}}
              style={styles.logo}
              resizeMode="cover"
            /> */}
          </View>
          <View style={styles.containerSelect}>
            <SelectList
              setSelected={(val: any) => handleClientChange(val)}
              data={clientes!}
              save="key"
              placeholder="Seleccione cliente"
              search={false}
              inputStyles={{
                color: '#333',
              }}
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
              arrowicon={<Icon name="chevron-down" size={15} color="#333" />}
              dropdownTextStyles = {{
                color: '#333',
              }}
            />
          </View>
        </View>

      </Suspense>
      {!clientes && <AppLoader />}
    </View>
  );

};

export default ClienteScreen;
