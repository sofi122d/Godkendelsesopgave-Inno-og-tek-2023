import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

const ProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  // Funktion til at håndtere log ud
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      // Håndter log ud-aktiviteter som navigation tilbage til log ind-siden eller andet
    } catch (error) {
      console.error("Fejl ved log ud:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dette er din profil {user ? user.email : 'Gæst'}</Text>
      {user && 
      <TouchableOpacity onPress={handleLogOut} style={styles.button}>
        <Text style={styles.buttonText}>Log ud</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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