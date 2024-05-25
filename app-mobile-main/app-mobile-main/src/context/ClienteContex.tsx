import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useContext,
  useEffect,
  Suspense,
} from 'react';
import {ContextLogin} from './AuthContextLog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {myHeaders} from '../services/api';
import {i18next, initializeI18n} from '../config/i18next.config';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import AppStyles from '../styles';
import { handleLogoutApp } from '../store/auth/authStore';
import { COLORS } from '../constants';
const STORAGE_KEY = '@miApp:estadoCliente';
interface Usuario {
  estado: string;
  mensaje: string;
  c_usuario: string;
  id_alumno: number | null;
  nombre: string;
  apellido: string;
  perfiles: number[];
}

interface Filter {
  id_menu_filtros: string;
  d_nombre: string;
  d_tipo: string; // Agregamos el tipo 'DATE'
  m_cargar: string;
  m_requerido: string;
  d_place_holder: string;
  d_valor_mimimo: null | string;
  d_valor_maximo: null | string;
  datos?: string[]; // Opcional para el tipo 'SELECT'
}

interface Menu {
  d_title: string;
  d_icon: string;
  d_url: string;
  d_url_endpoint?: string;
  filtros: Filter;
}
interface MenuSelectedUser {
  selectedMenu?: string;
  selectedItemMenu?: string;
}
interface Noticias {
  visible: boolean;
}

interface Cliente {
  estado?: string;
  mensaje?: string;
  c_cli?: string;
  cookie?: string;
  url_endpoint?: string;
  logo?: string;
  color_primario?: string;
  color_secundario?: string;
  idiomas?: string[];
  idioma_seleccionado?: string;
  usuario?: Usuario;
  menus?: Menu[];
  MenuSelectedUser?: MenuSelectedUser;
  noticia?: Noticias[];
  color_texto?: string;
}

interface AppState {
  cliente: Cliente;
}

interface SetClienteAction {
  type: 'SET_CLIENTE';
  payload: Cliente;
}
interface SetUsuarioAction {
  type: 'SET_USUARIO';
  payload: Usuario;
}

interface SetMenusAction {
  type: 'SET_MENUS';
  payload: Menu[];
}
interface ClearClientAction {
  type: 'CLEAR_CLIENTE';
  payload?: {};
}
interface SetMenuSelectUserAction {
  type: 'SET_SELECT_MENU_USER';
  MenuSelectedUser?: MenuSelectedUser;
}
interface SetNoticias {
  type: 'SET_NOTICIAS';
  payload?: Noticias;
}

type AppAction =
  | SetClienteAction
  | SetUsuarioAction
  | SetMenusAction
  | ClearClientAction
  | SetMenuSelectUserAction
  | SetNoticias;

const initialState: AppState = {
  cliente: {
    estado: '',
    mensaje: '',
    c_cli: '',
    url_endpoint: '',
    cookie: '',
    logo: '',
    color_primario: COLORS.primary,
    color_secundario:COLORS.secondary,
    idiomas: [],
    idioma_seleccionado: 'ES',
    usuario: {
      estado: '',
      mensaje: '',
      c_usuario: '',
      id_alumno: null,
      nombre: '',
      apellido: '',
      perfiles: [],
    },
    menus: [],
    MenuSelectedUser: {},
    noticia: [],
    color_texto: 'grey',
  },
};

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
  handleLogout: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  handleLogout: () => null,
});

// Reducer para manejar las acciones
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_SELECT_MENU_USER':
      return {
        ...state,
        cliente: {...state.cliente, MenuSelectedUser: action.MenuSelectedUser},
      };
    case 'SET_CLIENTE':
      return {...state, cliente: {...state.cliente, ...action.payload}};
    case 'CLEAR_CLIENTE':
      return initialState;
    case 'SET_USUARIO':
      return {...state, cliente: {...state.cliente, usuario: action.payload}};
    case 'SET_MENUS':
      return {...state, cliente: {...state.cliente, menus: action.payload}};
    case 'SET_NOTICIAS':
      return {...state, cliente: {...state.cliente, noticia: action.payload}};
    default:
      return state;
  }
};

// Proveedor del contexto
const AppContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  // const {logOut} = useContext(ContextLogin);

  useEffect(() => {
    const cargarEstadoCliente = async () => {
      try {
        await initializeI18n();
        const estadoClienteString = await AsyncStorage.getItem(STORAGE_KEY);

        if (estadoClienteString) {
          const estadoCliente = JSON.parse(estadoClienteString);
          dispatch({type: 'SET_CLIENTE', payload: estadoCliente});
          myHeaders.cli = estadoCliente.c_cli;
          i18next.changeLanguage(
            estadoCliente.idioma_seleccionado.toLowerCase(),
          );
        }
      } catch (error) {
        console.error(
          'Error al cargar el estado del cliente desde AsyncStorage:',
          error,
        );
      }
    };
    cargarEstadoCliente();
  }, []);

  // Guardar solo la parte del cliente en AsyncStorage cuando cambie
  useEffect(() => {
    const {cliente} = state;
    const guardarEstadoCliente = async () => {
      try {
        // Solo toma la parte del cliente
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cliente));
      } catch (error) {
        console.error(
          'Error al guardar el estado del cliente en AsyncStorage:',
          error,
        );
      }
    };
    {
      cliente.c_cli && guardarEstadoCliente();
    }
  }, [state.cliente]);

  const handleLogout = () => {
    // logOut(); 

    //funcion de store/auth de zustand
    handleLogoutApp();
    dispatch({
      type: 'SET_USUARIO',
      payload: {
        estado: '',
        mensaje: '',
        c_usuario: '',
        nombre: '',
        perfiles: [],
      },
    });
  };
  const stylesGral = AppStyles();
  return (
    // <Suspense
    //   fallback={
    //     <ActivityIndicator
    //       animating={true}
    //       size={100}
    //       style={stylesGral.container}
    //       //color={MD2Colors.black}
    //     />
    //   }>
    <AppContext.Provider value={{state, dispatch, handleLogout}}>
      {children}
    </AppContext.Provider>
    // </Suspense>
  );
};

export {AppContext, AppContextProvider};
