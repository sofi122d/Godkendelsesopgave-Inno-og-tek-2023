import * as React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";

// Hjemmeskærm
const Overblik = ({ navigation }) => {
  const [foods, setFoods] = useState([]);

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

  const foodArray = Object.values(foods);
  const foodKeys = Object.keys(foods);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overblik over mad valgmuligheder</Text>
      <FlatList
        data={foodArray}
        keyExtractor={(item, index) => foodKeys[index]}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.container} onPress={() => handleSelectFood(foodKeys[index])}>
            <Text style={{paddingTop: 5}} >-- {item.kategori}, {item.type}, Pris: {item.pris}, Lager: {item.lager}</Text>
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
