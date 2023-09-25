// Selve importering af moduler
import * as React from 'react';
import { Text, View, Button} from 'react-native';


// Indtillinger
export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Indstillinger</Text>
      <Button title="Gå til hjem" onPress={() => navigation.navigate('Hjem')} />
    </View>
  );
}