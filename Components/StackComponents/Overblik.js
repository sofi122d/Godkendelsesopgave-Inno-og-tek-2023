import * as React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList, TextInput} from 'react-native';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";

// Overblik over madvarer
const Overblik = ({ navigation }) => {
  const [foods, setFoods] = useState([]);
  const [searchText, setSearchText] = useState(""); // Tilføjer en tilstand til søgeordet
  const [originalFoods, setOriginalFoods] = useState([]); // Gem den oprindelige liste

  useEffect(() => {
    const db = getDatabase();
    const foodsRef = ref(db, "foods");

    onValue(
      foodsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          console.log("Hentede data:", data);
          setFoods(data);
          setOriginalFoods(data); // Gemmer den oprindelige liste
        } else {
          console.log("Ingen data fundet i 'Foods' sti.");
        }
      },
      (error) => {
        console.error("Fejl under hentning af data:", error);
      }
    );

    return () => {
      off(foodsRef);
    };
  }, []);

  const handleSelectFood = id => {
    const food = Object.entries(foods).find(food => food[0] === id)
    navigation.navigate('Food_Details', { food });
  };

  const handleSearch = () => {
    // Filtrer mad baseret på søgeordet
    const filteredFoods = foodArray.filter((item) =>
      item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
      item.type.toLowerCase().includes(searchText.toLowerCase())
    );
    setFoods(filteredFoods);
  };

  const handleClearSearch = () => {
    setSearchText(""); // Rydder søgeordet
    setFoods(originalFoods); // Gendander den oprindelige liste
  };

  
  const foodArray = Object.values(foods);
  const foodKeys = Object.keys(foods);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overblik over mad valgmuligheder</Text>
      <TextInput
        style={styles.input}
        placeholder="Søg efter mad baseret på allagener og præferencer..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <Button title="Søg" onPress={handleSearch} />
      <Button title="Ryd søgning" onPress={handleClearSearch} />
      <FlatList
        data={foodArray}
        keyExtractor={(item, index) => foodKeys[index]}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.container} onPress={() => handleSelectFood(foodKeys[index])}>
            <Text style={{paddingTop: 5}} >- {item.type},  Allergener/Præferencer: {item.kategori}, Pris: {item.pris} kr., Lager: {item.lager}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Tilføj eller ændre madvarer" onPress={() => navigation.navigate('Add_edit_food')} />
    </View>
  );
}

export default Overblik;

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
