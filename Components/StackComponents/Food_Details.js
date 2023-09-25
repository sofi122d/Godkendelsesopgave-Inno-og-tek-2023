import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, remove } from "firebase/database";

export default function FoodDetails({ navigation, route }) {
  const [food, setFood] = useState({});

  useEffect(() => {
    setFood(route.params.food[1]);
    return () => {
      setFood({});
    };
  }, []);

  const handleEdit = () => {
    const foodData = route.params.food[1];
    navigation.navigate('Add_edit_food', { food: foodData });
  };

  const confirmDelete = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Alert.alert('Er du sikker?', 'Vil du slette maden?', [
        { text: 'Annuller', style: 'cancel' },
        { text: 'Slet', style: 'destructive', onPress: handleDelete },
      ]);
    }
  };

  const handleDelete = async () => {
    try {
      const foodId = route.params.food[0];
      const db = getDatabase();
      const foodRef = ref(db, `foods/${foodId}`);
      await remove(foodRef);
      navigation.navigate('Overblik');
    } catch (error) {
      Alert.alert('Fejl', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {Object.entries(food).map(([key, value], index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.label}>{key}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
      <Button title="Rediger mad" onPress={handleEdit} />
      <Button title="Slet mad" onPress={confirmDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 18,
  },
});
