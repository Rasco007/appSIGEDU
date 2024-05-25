import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './drawer/index';
import { createStackNavigator } from '@react-navigation/stack';

import Logeo from './logeo';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { AppContext } from '../context/ClienteContex';
import { DialogTitle } from '../components';
import { useDialog } from '../context/DialogContext';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import useAuthStore from '../store/auth/authStore';
import useDialogStore from '../store/dialogGlobal/dialogStore';

// const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  const { state } = useContext(AppContext);
  const { color_primario, color_secundario } = state.cliente;
  // const { titulo, mensaje, visible, setVisible } = useDialog();
  const { isLogin } = useAuthStore();
  const { titulo, mensaje, visible, setVisible } = useDialogStore();
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color_primario,
      secondary: color_secundario,
    },
  };

  return (
    <PaperProvider theme={theme}>
      {isLogin ? (
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      ) : (
        <Logeo />
      )}
      <DialogTitle titulo={t(titulo)} mensaje={t(mensaje)} estado={visible} setEstado={setVisible} />
    </PaperProvider>
  );
};

export default AppNavigation;
