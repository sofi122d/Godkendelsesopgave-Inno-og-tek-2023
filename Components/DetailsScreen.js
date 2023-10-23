// Selve importering af moduler
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, SafeAreaView, Button, Text, ScrollView} from 'react-native';
import * as Location from 'expo-location';

// Steder til marker
const places = [
  {
    title: 'Eiffeltårnet, Paris',
    description: 'Det ikoniske Eiffeltårn i Paris',
    coordinate: {
      latitude: 48.8588443,
      longitude: 2.2943506,
    },
  },
  {
    title: 'CBS, København',
    description: 'Copenhagen Business School i København',
    coordinate: {
      latitude: 55.693707,
      longitude: 12.547475,
    },
  },
  {
    title: 'Big Ben, London',
    description: 'Det berømte Big Ben i London',
    coordinate: {
      latitude: 51.5007292,
      longitude: -0.1246254,
    },
  },
];

// funktion
export default function DetailsScreen() {

  // UseState variabler
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userMarkerCoordinates, setUserMarkerCoordinates] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showMarkerInfo, setShowMarkerInfo] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);

  // Metode til at tillade adgnag og se enhedens lokation
  useEffect(() => {
    async function getLocationPermission() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setHasLocationPermission(true);
      }
    }

    getLocationPermission();
  }, []);

  // Metode til at sætte markøre
  const handleLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setUserMarkerCoordinates([...userMarkerCoordinates, coordinate]);
  };

  // Metode til at registrere, hvilken markør der er blevet trykket på, og for at hente adresseoplysningerne for den valgte markør
  const handleSelectMarker = async (coordinate) => {
    setSelectedCoordinate(coordinate);
    try {
      const locationInfo = await Location.reverseGeocodeAsync(coordinate);
      if (locationInfo.length > 0) {
        const address = locationInfo[0];
        setSelectedAddress(
          `${address.name}, ${address.street}, ${address.postalCode} ${address.city}`
        );
      }
    } catch (error) {
      console.error('Fejl ved opslag af adresse:', error);
    } toggleMarkerInfo();
  };

  // Metode der viser ovenstående marker info
  const toggleMarkerInfo = () => {
    setShowMarkerInfo(!showMarkerInfo);
  };

  // Metode der opdaterer lokationen på enheden igen
  const updateLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
  
      // Hent den aktuelle adresse baseret på den aktuelle lokation
      const locationInfo = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
  
      if (locationInfo.length > 0) {
        const address = locationInfo[0];
        setCurrentAddress(
          `${address.name}, ${address.street}, ${address.postalCode} ${address.city}`
        );
      }
    } catch (error) {
      console.error('Fejl ved opdatering af position:', error);
    }
  };

  // Metode der henter lokationen på enheden igen bruges til onpress på knap
  const RenderCurrentLocation = () => {
    return (
      <View>
        <Button title="Hent nuværende position" onPress={updateLocation} />
        {currentLocation && (
          <Text>
            Nuværende lokation:
            {'\n'}
            {currentAddress ? `Adresse: ${currentAddress}` : 'Adresse ikke tilgængelig'}
          </Text>
        )}
      </View>
    );
  };

  // Metode der sletter brugerens koordinater fra liste
  const deleteUserCoordinate = (index) => {
    const updatedCoordinates = [...userMarkerCoordinates];
    updatedCoordinates.splice(index, 1); // Slet koordinatet ved det angivne indeks
    setUserMarkerCoordinates(updatedCoordinates);
  };

  // Metode der laver liste med koordinater
  const UserCoordinatesList = () => {
    return (
      <View style={styles.userCoordinatesList}>
        <Text style={styles.coordinatesHeader}>Dine markører:</Text>
        <ScrollView style={styles.coordinatesScrollView}>
          {userMarkerCoordinates.map((coordinate, index) => (
            <View key={index} style={styles.coordinateItem}>
              <Text>
              Koordinater: Lat: {coordinate.latitude}, Lng: {coordinate.longitude}
              </Text>
              <Button title="Slet" onPress={() => deleteUserCoordinate(index)} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  

  
  // Const der henter ovenstående marker info igen til view
  const MarkerInfo = () => {
    if (!showMarkerInfo) {
      return null;
    }

    return (
      <View style={styles.markerInfo}>
       <Text>Adresse på den markerede marker</Text>
        <Text>
          Koordinater:
          {`Lat: ${selectedCoordinate.latitude}, Lng: ${selectedCoordinate.longitude}`}
        </Text>
        <Text>Adresse: {selectedAddress || 'Adresse ikke tilgængelig'}</Text>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={hasLocationPermission}
        followsUserLocation={hasLocationPermission}
        onLongPress={handleLongPress}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={place.coordinate}
            title={place.title}
            description={place.description}
          />
        ))}

        {userMarkerCoordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
            title={`Marker ${index + 1}`}
            description={`Custom marker at ${coordinate.latitude}, ${coordinate.longitude}`}
            onPress={() => handleSelectMarker(coordinate)}
          />
        ))}

        {selectedCoordinate && (
          <Marker
            coordinate={selectedCoordinate}
            title="Valgt Markør"
            description={selectedAddress || 'Adresse ikke tilgængelig'}
          />
        )}

        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Nuværende Position"
            description="Din nuværende placering"
          />
        )}
      </MapView>

      <RenderCurrentLocation />
      <MarkerInfo />

      {/* Vis brugerens valgte koordinater og knapper til at slette dem */}
      <UserCoordinatesList />

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  map: {
    width: '100%',
    height: '65%',
  },
});