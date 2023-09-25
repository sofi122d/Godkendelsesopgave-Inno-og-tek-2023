import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image} from 'react-native';
import { GET_USERS_URL } from '../../const'; // Husk at importere din endpoint fra const.js

const FetchListComponent = () => {
  const [users, setUsers] = useState([]); // Initial state er en tom liste
  const [msg, setMsg] = useState(''); // Initial state er en tom streng
  const [amount, setAmount] = useState(0); // Initial state er 0

  const loadUsers = async () => {
    try {
        const response = await fetch(GET_USERS_URL+amount);
        const json = await response.json();
        setUsers(json.results);
    } catch (error) {
      setMsg('Fejl ved indlæsning af brugere.');
    }
  };

  useEffect(() => {
    loadUsers();
  }, [amount]);


  return (
    <View style={{ flex: 1, paddingTop: 50, alignItems: 'center'}}>
      {users && users.length > 0 ? (
        <View>
          <Text style={{ fontSize: 20, textAlign:'center', paddingBottom:10 }}>Fetchlist</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'black', width: '70%', padding: 4 }}
            onChangeText={(text) => setAmount(parseInt(text))}
            value={amount.toString()}
            placeholder="Indtast antal"
            keyboardType="numeric"
          />
          <ScrollView bounces={true} style={{ height: 50, width: '60%' }}>
            {users.map((user, index) => (
            <View key={index} style={{alignItems: 'center', padding: 10}}>
              <Text>Navn: {user.name.first} {user.name.last}</Text> 
              <Image source={{uri:user.picture.medium}} style={{width: 50, height: 50}}/>
            </View>
            ))}
          </ScrollView>
          <Text>{msg ? msg : ''}</Text>
        </View>
      ) : (
        <Text>Ingen brugere tilgængelige.</Text>
      )}
    </View>
  );
};

export default FetchListComponent;
