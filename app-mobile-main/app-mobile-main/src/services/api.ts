import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleLogoutApp } from '../store/auth/authStore';
import { setDialogMessage, setDialogTitle, setDialogVisibility } from '../store/dialogGlobal/dialogStore';
import Config from 'react-native-config';
const STORAGE_KEY = '@miApp:estadoCliente';
//SETEA EL TOKEN EN EN ASYNCSTORAGE
const storeToken = async (token: any) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    console.error(error);
  }
};
//SETEA EL TOKEN EN EN ASYNCSTORAGE
// const storeBackUrlClient = async (BackURL: any) => {
//   try {
//     await AsyncStorage.setItem('base_url_cliente', BackURL);
//   } catch (error) {
//     console.error(error);
//   }
// };

//SETEAR EL CLI (CODIGO CLIENTE EN EL ASYNCSTORAGE)
// const storeCLI = async (CLI: any) => {
//   try {
//     const cli = await AsyncStorage.setItem('CLI', CLI);
//     return cli;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// const getCLI = async () => {
//   try {
//     const cli = await AsyncStorage.getItem('CLI');

//     return cli; // Devuelve el valor recuperado de AsyncStorage
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

const getCLIENT = async () => {
  try {
    const data_client: any = await AsyncStorage.getItem(STORAGE_KEY);
    const estadoCliente = JSON.parse(data_client);
    return estadoCliente; // Devuelve el valor recuperado de AsyncStorage
  } catch (error) {
    console.error(error);
    return null;
  }
};
interface ApiConfig {
  baseURL: string;
  headers: {
    cli?: string;
    accessToken?: string[];
  };
  withCredentials?: boolean;
}

const myHeaders = {
  cli: '',
  accessToken: [],
};

const url = {
  url: Config.URL!,
};
const apiConfig: ApiConfig = {
  baseURL: url.url,
  // baseURL: 'http://10.11.143.18:5004/sistema',
  headers: myHeaders,
  withCredentials: true
};

const apiFrmwk = axios.create(apiConfig);

apiFrmwk.interceptors.request.use(
  async (config) => {
    
    const data_client: any = await getCLIENT();
    
    if (data_client) {

      config.headers['CLI'] = data_client.c_cli;
    
      }
    //    else {
    // //   // Redirigir al login o refrescar el token
    // //   setDialogTitle('Ha habido un Problema');
    // //   setDialogMessage('Seleccione un cliente.');
    // //   setDialogVisibility(true);
    // //   // Implementar lógica para redirigir o refrescar token
    // // }
    return config;
  },
  // (error) => {
  //   return Promise.reject(error);
  // },
  async (error) => {

    const data = error.response.data;
    setDialogMessage(data.message);
    setDialogVisibility(true);
    // El servidor respondió con un error 401

    return Promise.reject(error);
  }
);
apiFrmwk.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // setDialogTitle('Ha habido un Problema ');
    // setDialogMessage(data.message);
    // setDialogVisibility(true);
    // El servidor respondió con un error 401
     
     // Redirigir al login o refrescar el token
     setDialogTitle('Ha habido un Problema');
     setDialogMessage('Cliente no disponible.');
     setDialogVisibility(true);
     // Implementar lógica para redirigir o refrescar token

    return Promise.reject(error);
  }
);

// Configuración de axios con la URL base obtenida de AsyncStorage
const apiClient = axios.create({
  baseURL: '',
});


apiClient.interceptors.request.use(
  async (config) => {
    const data_client: any = await getCLIENT();
    const token = await getToken();

    if (data_client.url_endpoint) {
      config.baseURL = data_client.url_endpoint;
      // config.baseURL = `${Config.LOCALHOST}:5002/sistema`;
    }
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      // Configurar el tiempo de espera en milisegundos (por ejemplo, 10 segundos)
      // config.timeout = 10000; // 10 segundos
    } else {
      setDialogTitle('Ha habido un Problema ');
      setDialogMessage('Token expirado');
      setDialogVisibility(true);
    }
    return config;
  },

);

const LogoutHandler = async () => {
  try {
    handleLogoutApp();
  } catch (error) {
    console.error('Error al sair:', error);
  }
};

apiClient.interceptors.response.use(
  (response) => {

    //verificamos si se envio el token refrescado
    if (response.headers['refreshtoken']) {
      //actualizamos el token en el asyncstorage
      storeToken(response.headers['refreshtoken'])
  }
    return response;
  },
  async (error) => {
    setDialogTitle('Ha habido un Problema ');
    const data = error.response.data;

    
    setDialogMessage(data.message);
    setDialogVisibility(true);
    // El servidor respondió con un error 401
    if (error.response.status === 401) {
      await LogoutHandler();
    }
    // Por ejemplo, puedes redirigir al usuario al inicio de sesión
    // history.push('/login');

    return Promise.reject(error);
  }
);


export { apiFrmwk, myHeaders, apiConfig, apiClient, storeToken };

