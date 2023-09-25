// Selve importering af moduler
import * as React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, Button, Alert, StyleSheet} from 'react-native';
import { getDatabase, ref, push, update  } from "firebase/database"; 
import { useState} from "react";


// Første funktion - Add edit food
const Add_edit_food = ({ navigation, route }) => {
  // Hent database og sæt initialState
  const db = getDatabase();
  const initialState = { type: '', kategori: '', pris: '', lager: '' }
  const [newFood, setNewFood] = useState(initialState);

  const isEditFood = route.name === 'Ændre food';

  const changeTextInput = (name, event) => {
    setNewFood({ ...newFood, [name]: event });
  };

  const handleSave = () => {
    const { Type, Kategori, Pris, Lager } = newFood;

    if (Type && Type.length === 0 || Kategori && Kategori.length === 0 || Pris && Pris.length === 0 || Lager && Lager.length === 0) {
      Alert.alert('Advarsel', 'Alle felter skal udfyldes');
      return;
    }

    if (isEditFood) {
      // Opdater eksisterende oplysninger i Firebase
      const FoodId = route.params.FoodId;
      const FoodRef = ref(db, `foods/${FoodId}`);
      update(FoodRef, newFood)
        .then(() => {
          Alert.alert('Success', 'Deltajer opdateret');
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert('Fejl', 'Der opstod en fejl under opdatering af detaljer');
          console.error(error);
        });
    } else {

      // Tilføj en ny mulighed til Firebase
      const foodsRef = ref(db, 'foods');
      push(foodsRef, newFood)
        .then(() => {
          Alert.alert('Success', 'Ny madmulighed tilføjet');
          setNewFood(initialState);
        })
        .catch((error) => {
          Alert.alert('Fejl', 'Der opstod en fejl under tilføjelse af en ny madvarer');
          console.error(error);
        });
    }
    };


  return (
    <SafeAreaView>
      <ScrollView>
        {Object.keys(newFood).map((param, index) => (
          <View key={index} style={styles.container}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>{param}</Text>
            <TextInput
              value={newFood[param]}
              onChangeText={(event) => changeTextInput(param, event)}
              style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
            />
          </View>
        ))}
      </ScrollView>
      <Button onPress={handleSave} title={isEditFood ? 'Gem ændringer' : 'Tilføj mad'} />
      <Button title="Gå tilbage til overblik over valgmuligheder" onPress={() => navigation.navigate('Overblik')}/>
    </SafeAreaView>
  );
};


export default Add_edit_food


/*
<View style={styles.container}>
      <Text>Tilføj mad valgmuligheder</Text>
      <Button title="Gå tilbage til overblik over valgmuligheder" onPress={() => navigation.navigate('Overblik')}/>
    </View>
 */

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
      backgroundColor: 'pink',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
    },
});