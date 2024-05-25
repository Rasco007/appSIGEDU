import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 75, // Ajustar la altura
  },
  title: {
    fontSize: 35,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  title_header: {
    fontSize: 21,
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: 90,
  },
});

export default styles;
