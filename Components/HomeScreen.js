import * as React from 'react';
import { Text, View, Button, StatusBar, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";


export default function HomeScreen({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hent data fra Firebase Realtime Database
  useEffect(() => {
    const db = getDatabase();
    const foodsRef = ref(db, "foods");

    onValue(
      foodsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const foodList = Object.values(data);
          setFoods(foodList);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Fejl under hentning af data:", error);
        setLoading(false);
      }
    );

    // Ryd op og stop lytning, når komponenten afmonteres
    return () => {
      off(foodsRef);
    };
  }, []);

  const handleOrder = (food) => {
    Alert.alert('Bestil mad', `Du har bestilt ${food.type} for ${food.pris} kr. til kl. 12:00`);
    // Her kan du tilføje yderligere logik til at håndtere bestillinger, f.eks. sende data til en database.
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Bestil mad</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={foods}
          keyExtractor={(item) => item.type.toString()}
          renderItem={({ item }) => (
            <FoodItem food={item} onOrder={handleOrder} />
          )}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const FoodItem = ({ food, onOrder }) => (
  <TouchableOpacity style={styles.foodItem} onPress={() => onOrder(food)}>
    <Text style={styles.foodTextTwo}>Bestil {food.type} her </Text>
    <Text style={styles.foodText}>{food.kategori}</Text>
    <Text style={styles.foodText}>Pris: {food.pris} kr.</Text>
    <Text style={styles.foodText}>Bestil her</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  foodItem: {
    backgroundColor: 'pink',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  foodText: {
    fontSize: 16,
  },
  foodTextTwo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


/*// Selve importering af moduler
import * as React from 'react';
import { Text, View, Button, StatusBar, StyleSheet} from 'react-native';



// Hjemmeskærm
export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{paddingTop: 40, fontWeight: 'bold'}}>Bestil mad</Text>
      <Text style={{paddingTop: 40, padding: 40}}>Her skal man kunne bestille den mad, til den tid eller ligende man gerne vil hente den</Text>
      <StatusBar style="auto" />
    </View>
  );
}
*/



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