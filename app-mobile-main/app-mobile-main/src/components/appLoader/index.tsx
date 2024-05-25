import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants';

const AppLoader: React.FC = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require('./Loaders/appLoader.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
  animation: {
    width: 180, // Especifica el ancho deseado
    height: 180, // Especifica la altura deseada
  },
});

export default AppLoader;
