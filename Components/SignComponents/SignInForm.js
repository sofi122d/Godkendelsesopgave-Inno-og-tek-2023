import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import {TextInput, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation fra '@react-navigation/native'

// Sign up funktion
const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCompleted, setCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const auth = getAuth();
  
    // handleSubmit metode
    const handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setCompleted(true);
        setErrorMessage(null);
      } catch (error) {
        setCompleted(false);
        setErrorMessage(error.message);
      }
    };

      const navigation = useNavigation(); // Brug useNavigation-hook til at få navigation objektet

        const handleSignUp = () => {
            navigation.navigate('Tilmeld'); // Naviger til Tilmeld-siden ved hjælp af navigation objektet
        };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
        />
        {isCompleted && <Text style={styles.successText}>Login succesfuld!</Text>}
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text></Text>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Opret ny bruger</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default SignUpForm;


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
    input: {
      width: '80%',
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      marginBottom: 10,
    },
    successText: {
      color: 'green',
      marginBottom: 10,
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
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