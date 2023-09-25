// Selve importering af moduler
import * as React from 'react';
import { Text, View, Button, StatusBar, StyleSheet} from 'react-native';


// Hjemmeskærm
export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{paddingTop: 40, fontWeight: 'bold'}}>Bestil mad</Text>
      <Text style={{paddingTop: 40, padding: 40}}>Her skal man kunne bestille den mad, til den tid eller ligende man gerne vil hente den</Text>
      <Button title="Gå til indstillinger" onPress={() => navigation.navigate('Indstillinger')}/>
      <StatusBar style="auto" />
    </View>
  );
}


/*
import ArrayListComponent from './ListComponents/ArrayListComponent'; 
import FetchListComponent from './ListComponents/FetchListComponent';
import FlatListComponent from './ListComponents/FlatListComponent';

<View style={{ flexDirection: 'row' }}>
      <ArrayListComponent/>
      <FlatListComponent/>
      </View>
      <FetchListComponent/>
*/