// Selve importering af moduler
import * as React from 'react';
import { Text, View, Button, TouchableOpacity} from 'react-native';
import GlobalStyles from "../GlobalStyles/GlobalStyles";
import { useState } from 'react';


// Indtillinger
export default function SettingsScreen({ navigation }) {
  const [clicked, setClicked] = useState(false)

  return (
    <View style={GlobalStyles.container}>
      <Text>Indstillinger</Text>
      <TouchableOpacity 
        style={[GlobalStyles.btn, clicked ? GlobalStyles.defaultColor : GlobalStyles.color]} 
        onPress={() => setClicked(!clicked)} > 
        <Text>
          Hej
        </Text>
      </TouchableOpacity>
    </View>
  );
}