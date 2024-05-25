import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import {CarouselApp} from '../../components/index';
import AppStyles from './styles';
import jsonData from '../../utils/api/carousel.json';

interface novedad {
  title: string;
  urlImage: string;
  body: string;
}

interface Props {
  Carousel: novedad[];
}

const NovedadScreen: React.FC<Props> = () => {
  const {state, cardsNovedades} = jsonData;
  const {width} = useWindowDimensions();
  const [activeSlide, setActiveSlide] = useState(0);
  const styles = AppStyles();
  const renderItem = ({item}: {item: novedad}) => (
    <View style={[styles.slide, {width}, {padding: 8}]}>
      <View style={[styles.card]}>
        <View style={styles.imageBody}>
          <Image source={{uri: item.urlImage}} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </View>
  );
  const keyExtractor = (item: Props, index: number) => index.toString();
  return (
    <SafeAreaView style={styles.container}>
      <CarouselApp
        data={cardsNovedades}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default NovedadScreen;
