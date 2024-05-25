import {NavigationContainerRef} from '@react-navigation/native';

// Define una variable para almacenar la referencia de navegación
let navigationRef: React.RefObject<NavigationContainerRef<{}>> | null = null;

// Establece la referencia de navegación
function setTopLevelNavigator(
  ref: React.RefObject<NavigationContainerRef<{}>> | null,
) {
  navigationRef = ref;
}

// Función para navegar a una pantalla
function navigate(routeName: string, params?: object) {
  if (navigationRef && navigationRef.current) {
    navigationRef.current.navigate(routeName, params);
  }
}

// Función para restablecer la navegación a una pantalla específica
function reset(routeName: string) {
  if (navigationRef && navigationRef.current) {
    navigationRef.current.reset({
      index: 0,
      routes: [{name: routeName}],
    });
  }
}

// Agregar otras funciones de navegación según sea necesario

export default {
  setTopLevelNavigator,
  navigate,
  reset,
  // Agregar otras funciones aquí
};
