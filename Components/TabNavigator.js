import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'; // Importer din HomeScreen-komponent
import StackNavigator from './StackNavigator'; // Importer din StackNavigator-komponent
import ProfilScreen from './SignComponents/ProfilScreen'; // Importer din AuthStack
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

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
          } else if (route.name === 'Overblik') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'pink',
        tabBarInactiveTintColor: 'grey',

      })}>

      <Tab.Screen name="Bestil" component={HomeScreen} />
      <Tab.Screen name="Overblik" component={StackNavigator} />
      <Tab.Screen name="Min profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
