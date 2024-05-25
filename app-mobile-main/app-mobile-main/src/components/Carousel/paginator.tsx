import {View, Text, useWindowDimensions, Animated} from 'react-native';
import React from 'react';
// import styles from './styles';
import AppStyles from './styles';
interface PaginatorTypes {
  data: any;
  scrollX: any;
}

const Paginator: React.FC<PaginatorTypes> = props => {
  const {data} = props;
  const {scrollX} = props;
  const {width} = useWindowDimensions();
  const styles = AppStyles();
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          flexDirection: 'row',
          height: 64,
          paddingTop: 5,
        },
      ]}>
      {data.map((_: any, i: any) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
