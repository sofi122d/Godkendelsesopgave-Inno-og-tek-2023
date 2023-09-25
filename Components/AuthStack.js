import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInForm from './SignComponents/SignInForm'; // Importer din SignInForm-komponent
import SignUpForm from './SignComponents/SignUpForm'; // Importer din SignUpForm-komponent

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Log ind" component={SignInForm} />
      <Stack.Screen name="Tilmeld" component={SignUpForm} />
    </Stack.Navigator>
  );
};

export default AuthStack;
