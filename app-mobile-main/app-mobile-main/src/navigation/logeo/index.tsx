import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ClienteScreen, LoginScreen} from '../../screens';
import {COLORS} from '../../constants';

const Stack = createNativeStackNavigator();

const routeScreenDefaultOptions = {
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTitleStyle: {
    color: '#FFF',
  },
};

const Logeo = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cliente">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{...routeScreenDefaultOptions, headerShown: false}}
        />
        <Stack.Screen
          name="Cliente"
          component={ClienteScreen}
          options={{...routeScreenDefaultOptions, headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Logeo;
