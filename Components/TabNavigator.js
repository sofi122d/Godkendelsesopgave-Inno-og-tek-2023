import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Til tab
import HomeScreen from './HomeScreen'; // Importer din HomeScreen-komponent
import StackNavigator from './StackNavigator'; // Importer din StackNavigator-komponent
import ProfilScreen from './SignComponents/ProfilScreen'; // Importer din AuthStack
import Ionicons from 'react-native-vector-icons/Ionicons';

// Til draw
import SettingScreen from './SettingsScreen'
import CameraScreen from './CameraComponents/CameraScreen';
import ImageScreen from './CameraComponents/ImageScreen';
import DetailsScreen from './DetailsScreen';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Bestil') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Min profil') {
            iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
          } else if (route.name === 'Mad overblik') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'pink',
        tabBarInactiveTintColor: 'grey',

      })}>

      <Tab.Screen name="Bestil" component={HomeScreen} />
      <Tab.Screen name="Mad overblik" component={StackNavigator} />
      <Tab.Screen name="Min profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};


const TabDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="TabNavigator">
      <Drawer.Screen name="Din kantine app" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default TabDrawerNavigator;

/*
//export default TabNavigator;

      <Drawer.Screen name="Indtillinger" component={SettingScreen} />
      <Drawer.Screen name="CameraScreen" component={CameraScreen} />
      <Drawer.Screen name="ImageScreen" component={ImageScreen} />
      <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />

*/
