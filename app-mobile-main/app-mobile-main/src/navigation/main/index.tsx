import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  //Home,
  CalendarScreen,
  NotificationScreen,
  MenuDinamicoScreen,
  TramiteScreen,
  NovedadScreen,
  PerfilScreen,
  ImpuestoScreen,
  ComponentsScreen,
  PDFViewer,
  Home2,
  AcademicoScreen,
} from '../../screens';

import {CustomHeader} from '../../components';
import {COLORS} from '../../constants';

const Stack = createNativeStackNavigator();

type RouteParams = {
  title: string;
  codename: string;
  // Otros campos si es necesario
};
type CustomHeaderProps = {
  navigation: any;
  route: any;
  currentScreen: string; // Agrega la prop currentScreen
};
const screenOptions = {
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerTintColor: COLORS.text,
  headerTitleStyle: {
    fontWeight: '500',
  },
  codename: 'Dash',
  header: ({navigation, route}: CustomHeaderProps) => {
    return <CustomHeader navigation={navigation} route={route} />;
  },
};

const screens = [
  {
    name: 'Dash',
    component: Home2,
    options: {title: 'Dashboard'},
    codename: 'DASH',
  },
  {
    name: 'Notification',
    component: NotificationScreen,
    options: {
      title: 'Notificacion',
    },
    codename: 'NOTIF',
  },
  {
    name: 'Tramites',
    component: TramiteScreen,
    path: 'TRAM',
    options: {title: 'Mis Tramites'},
  },
  {
    name: 'Ddjj',
    component: MenuDinamicoScreen,
    options: {
      title: 'DECLARACIONES JURADAS',
    },
    path: 'DDJJ',
  },
  {
    name: 'NovedadScreen',
    component: NovedadScreen,
    options: {codename: 'NOVE'},
  },
  {
    name: 'CalendarScreen',
    component: CalendarScreen,
    options: {
      title: 'Calendario Fiscal',
      codename: 'CALEN',
    },
    path: 'COMPONENT',
  },

  {
    name: 'PerfilScreen',
    component: PerfilScreen,
    options: {title: 'Perfil'},
    path: 'COMPONENT',
  },
  {
    name: 'ImpuestoScreen',
    component: ImpuestoScreen,
    options: {title: 'Impuestos'},
    path: 'IMP',
  },
  {
    name: 'PdfScreen',
    component: PDFViewer,
    options: {
      title: 'Archivos',
    },
    path: 'PDF',
  },
  {
    name: 'Componentes',
    component: ComponentsScreen,
    options: {title: 'COMPONENTES'},
    path: 'COMPONENT',
  },
  {
    name: 'Home2',
    component: Home2,
    options: {title: 'HOME2'},
    path: 'HOME2',
  },
  {
    name: 'AcademicoScreen',
    component: AcademicoScreen,
    options: {title: 'ACADEMICOSCREEN'},
    path: 'ACADEMICOSCREEN',
  },
];

const MainNavigator: React.FC = () => {
  const screenOptions = ({navigation, route}: any) => {
    return {
      header: () => <CustomHeader navigation={navigation} route={route} />,
    };
  };

  return (
    <Stack.Navigator initialRouteName="Dash" screenOptions={screenOptions}>
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          codename={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default MainNavigator;
