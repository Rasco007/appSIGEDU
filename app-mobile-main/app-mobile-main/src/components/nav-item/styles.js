import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

export const styles = StyleSheet.create({
  tabContainer: {
    width: 60, // Ajusta el ancho del círculo
    height: 60, // Ajusta la altura del círculo
    borderRadius: 30, // Hace que el contenedor sea circular
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45, // Ajusta el valor según sea necesario para posicionarlo más arriba
  },
  tabIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary, // Color del borde
    borderWidth: 2, // Ancho del borde
  },
  focusedIcon: {
    backgroundColor: COLORS.white, // Color de fondo cuando está seleccionado
  },
});
