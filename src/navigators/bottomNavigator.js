import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { bottomTabTheme } from '../themes/default';
import HomeScreen from '../screens/Movie';
import SearchScreen from '../screens/Movie/movieSearch';

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigation() {

  return (
    <PaperProvider theme={bottomTabTheme}>
      <Tab.Navigator
        activeColor="#AE0000"
        inactiveColor="#939090"
        sceneAnimationType="shifting"
        barStyle={[styles.bottomNavBackground, styles.boxWithShadow]}>
        <Tab.Screen
          name="Trending"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons name='local-fire-department' size={28} color={focused ? "#AE0000" : "#939090"} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons name='search' size={28} color={focused ? "#AE0000" : "#939090"} />
            ),
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  bottomNavBackground: {
    backgroundColor: '#ffffff',
  },
  boxWithShadow: {
    marginTop: 2,
    shadowColor: '#AD0E0E',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 10,
    shadowRadius: 1.41,
    elevation: 10
  }
});
