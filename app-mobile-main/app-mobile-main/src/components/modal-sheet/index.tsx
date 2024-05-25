import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Obtener la altura de la pantalla
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

// Establecer la posición máxima de traducción en Y para la hoja inferior
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

// Definir los tipos de propiedades para la hoja inferior
type ModalSheetProps = {
  children?: React.ReactNode;
};

// Definir los tipos de referencias para la hoja inferior
export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

// Componente de la hoja inferior
const ModalSheet = React.forwardRef<BottomSheetRefProps, ModalSheetProps>(
  ({children}, ref) => {
    // Crear un valor compartido para la traducción en Y
    const translateY = useSharedValue(0);

    // Crear un valor compartido para rastrear si la hoja está activa o no
    const active = useSharedValue(false);

    // Función para desplazar la hoja a la posición especificada
    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;

      // Aplicar animación de resorte a la traducción en Y
      translateY.value = withSpring(destination, {damping: 50});
    }, []);

    // Función para verificar si la hoja está activa
    const isActive = useCallback(() => {
      return active.value;
    }, []);

    // Configurar referencias imperativas
    useImperativeHandle(ref, () => ({scrollTo, isActive}), [
      scrollTo,
      isActive,
    ]);

    // Crear un valor compartido para rastrear el contexto del gesto
    const context = useSharedValue({y: 0});
    const [paddingBottom, setPaddingBottom] = useState(320);

    // Configurar el gesto de desplazamiento (pan)
    const gesture = Gesture.Pan()
      .onStart(() => {
        // Al inicio del gesto, almacenar la posición actual de la traducción en Y
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        'worklet';
        // Actualizar la traducción en Y según el gesto
        translateY.value = event.translationY + context.value.y;

        // Limitar la traducción en Y al valor máximo permitido
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        // Al finalizar el gesto, determinar la posición final y desplazar la hoja en consecuencia
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(0);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    // Crear un estilo animado para la hoja inferior
    const rBottomSheetStyle = useAnimatedStyle(() => {
      // Interpolar el radio de borde de acuerdo con la traducción en Y
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );

      const paddingBottom = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y, 0],
        [350, 0],
        Extrapolate.CLAMP,
      );

      // Definir el estilo final de la hoja inferior
      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
        elevation: 5, // Esto agrega sombra en Android
        shadowColor: '#000', // Esto agrega sombra en iOS
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingBottom,
      };
    });

    // Renderizar la hoja inferior con el gesto y el estilo animado
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[estilos.contenedorHojaInferior, rBottomSheetStyle]}>
          <View style={estilos.linea} />
          <View style={[estilos.contenedorScroll, {height: SCREEN_HEIGHT}]}>
            <ScrollView
              nestedScrollEnabled={true}
              style={[estilos.contenedorDesplazamiento, {marginBottom: 50}]}>
              <View style={estilos.contenedorContenido}>{children}</View>
            </ScrollView>
          </View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

// Definir estilos para la hoja inferior
const estilos = StyleSheet.create({
  contenedorHojaInferior: {
    height: SCREEN_HEIGHT,
    width: '100%',
    zIndex: 200,
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  linea: {
    width: 75,
    height: 8,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 10,
  },
  contenedorDesplazamiento: {
    flex: 1,
  },
  contenedorScroll: {},
  contenedorContenido: {
    flexGrow: 1,
    marginBottom: 150, // Ajusta este valor según sea necesario
  },
});

// Exportar el componente de la hoja inferior
export default ModalSheet;
