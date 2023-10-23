import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, TouchableOpacity, StatusBar, ScrollView, Linking, Alert} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';


const CameraScreen = (props) => { 

    const navigation = useNavigation();
    const cameraRef = useRef(); 

    const [hasPermission, setHasPermission] = useState(null);
    const [imagesArr, setImagesArr] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Der ikke er givet tilladelse til brug af kamera');
                return;
            } 
            
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (status !== 'granted') {
                    Alert.alert('Der ikke er givet tilladelse til brug af kamerarulle');
                    return;
                } 
            } 

            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
      }
    
      if (hasPermission === false) {
        return (
          <View style={styles.gallery}>
            <Text>No access to camera</Text>
            <Button title={"Change settings"} onPress={() => Linking.openSettings()} />
          </View>
        );
      }    

        const flipCamera = () => {
            setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
          };
        
        const snap = async () => {
            if (!cameraRef.current) {
                return;
            }
            setLoading(true);
            const result = await cameraRef.current.takePictureAsync();

           await MediaLibrary.saveToLibraryAsync(result.uri)
    
            setImagesArr((imagesArr) => [result].concat(imagesArr));
            setLoading(false);
        };
        
        const pickImage = async () => {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
            });
    
            if (!result.canceled) {
                setImagesArr((imagesArr) => [result].concat(imagesArr));
                navigation.navigate('ImageScreen', { image: result });
            }
        };
        
          return (
            <>
              <StatusBar StatusBarStyle="dark-content" style={{fontcolor:"white"}} backgroundColor={'rgba(255,255,255,0.4)'} />
              <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                    <TouchableOpacity onPress={flipCamera}>
                      <Text>Flip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={snap}>
                      <Text>{loading ? 'Tagning...' : 'Tag billede'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage}>
                      <Text>Galleri</Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              </View>
            </>
        );
    }

export default CameraScreen; 


/*
import { Camera, CameraType, Constants, Type, back} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useState, setHasPermission } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';

 */