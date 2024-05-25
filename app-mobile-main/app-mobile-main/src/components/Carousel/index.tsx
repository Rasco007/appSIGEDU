import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  useWindowDimensions,
  Animated,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import styles from './styles';
import slides from '../../utils/api/carousel.json';
import Paginator from './paginator';

interface CarouselProps {
  data: Array<any>;
  renderItem: (item: any) => React.ReactElement;
  keyExtractor: any;
  initialIndex?: number;
  objectDimension?: number;
}

// Define el componente CarouselApp
const CarouselApp: React.FC<CarouselProps> = props => {
  // Extrae las propiedades de las props
  const {data} = props;
  const {keyExtractor} = props;
  const {renderItem} = props;
  const initialIndex = props.initialIndex ? props.initialIndex : 0;
  const objectDimension = props.objectDimension ? props.objectDimension : 0;

  // Obtiene el ancho de la ventana del dispositivo
  const {width} = useWindowDimensions();

  // Crea una referencia mutable para rastrear el desplazamiento horizontal del carrusel
  const scrollX = useRef(new Animated.Value(0)).current;

  // Crea un estado para rastrear el índice actual del elemento visible en el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función llamada cuando cambian los elementos visibles en el carrusel
  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  // Crea una referencia mutable para el componente FlatList
  const slideRef = useRef<FlatList<any>>(null);

  // useEffect(() => {
  //   if (initialIndex != undefined && initialIndex !== currentIndex && slideRef.current) {
  //     slideRef.current.scrollToIndex({
  //       index: initialIndex,
  //       animated: true,
  //     });
  //   }
  // }, [initialIndex]);

  // Configuración para definir cuánto de un elemento debe ser visible para considerarse "visible"
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  //render de ejemplo
  // const renderItemm = ({item}: {item: novedad}) => (
  //    <View style={[styles.slide, {width}]}>
  //     <View style={styles.imageBody}>
  //       <Image source={{uri: item.urlImage}} style={styles.image} />
  //     </View>
  //     <Text style={styles.title}>{item.title}</Text>
  //     <Text style={styles.body}>{item.body}</Text>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          // Renderiza los elementos utilizando la función renderItem
          renderItem={renderItem}
          data={data} // Los datos del carrusel
          keyExtractor={keyExtractor} // La función para obtener las claves únicas de los elementos
          horizontal // Desplazamiento horizontal
          pagingEnabled // Permite desplazarse página por página
          bounces={false} // No permite rebote al final del carrusel
          // onScroll={Animated.event(
          //   // Rastrea el evento de desplazamiento y actualiza scrollX
          //   [{nativeEvent: {contentOffset: {x: scrollX}}}],
          //   {useNativeDriver: false},
          // )}
          // scrollEventThrottle={32} // Frecuencia de eventos de desplazamiento
          // onViewableItemsChanged={viewableItemsChanged} // Función que se llama cuando cambian los elementos visibles
          // viewabilityConfig={viewConfig} // Configuración de visibilidad
          showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal
          ref={slideRef} // Referencia al componente FlatList
          initialScrollIndex={initialIndex} // Índice inicial de desplazamiento
          getItemLayout={(data, index) => ({
            length: objectDimension,
            offset: objectDimension * index,
            index
          })} 
        />
      </View>

      {/* Renderiza el componente Paginator con datos y scrollX como propiedades */}
      {/* <Paginator data={data} scrollX={scrollX} /> */}
    </View>
  );
};

export default CarouselApp;
