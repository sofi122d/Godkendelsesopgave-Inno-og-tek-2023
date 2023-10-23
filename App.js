// Selve importering af moduler
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';

// Importering fra fireabse
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABQ6r3KjllvdDAiVgtJ74dhA2qnffoIko",
  authDomain: "app-innovation-2023.firebaseapp.com",
  databaseURL: "https://app-innovation-2023-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "app-innovation-2023",
  storageBucket: "app-innovation-2023.appspot.com",
  messagingSenderId: "721896915160",
  appId: "1:721896915160:web:0d8d821d63de95001c97ad"
};

const firebase = initializeApp(firebaseConfig);

//Import komponentfiler
import AuthStack from './Components/AuthStack'; // Importer din AuthStack-komponent
import TabNavigator from './Components/TabNavigator'; // Importer din TabNavigator-komponent


// App funktion
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;



/*
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button} from 'react-native';

import HomeScreen from "./Components/HomeScreen";
import SettingsScreen from "./Components/SettingsScreen";
import DetailsScreen from "./Components/DetailsScreen";
import StackNavigator from "./Components/StackNavigator";
import SignUpForm from "./Components/SignComponents/SignUpForm";
import SignInForm from "./Components/SignComponents/SignInForm";
import ProfileScreen from "./Components/SignComponents/ProfilScreen";

//Selve bottom tab
const Tab = createBottomTabNavigator();


// Code med iconer
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Hjem') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Indstillinger') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            } else if (route.name === 'Min profil') {
              iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
            } else if (route.name === 'Stack') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } 

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: 'pink',
          tabBarInactiveTintColor: 'grey',

        })}
      >
  
        <Tab.Screen name="Hjem" component={HomeScreen} options={{ tabBarBadge: 1 }}/>
        <Tab.Screen name="Indstillinger" component={SettingsScreen} />
        <Tab.Screen name="Min profil">
          {() => (
            user ? <ProfileScreen/> : (
              <>
                <SignUpForm />
                <SignInForm />
              </>
            )
          )}
        </Tab.Screen>
        <Tab.Screen name="Stack" component={StackNavigator} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

*/


/*
// Code uden iconer
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
*/

/*
// Hjemmeskærm
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')}/>
    </View>
  );
}

// Indtillinger
function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}*/