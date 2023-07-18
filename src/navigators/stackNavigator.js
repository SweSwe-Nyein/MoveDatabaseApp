import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from '../screens/Movie/movieDetail';
import BottomNavigation from './bottomNavigator';
import SplashScreen from '../screens/splash';


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
