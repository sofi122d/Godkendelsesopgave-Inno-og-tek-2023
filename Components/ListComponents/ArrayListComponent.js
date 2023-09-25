import {Text, View, ScrollView, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import * as React from "react";
import { COUNTRIES } from '../../const';


const ArrayListComponent = (props) => { 
    return (
        <SafeAreaView style={styles.container}>
        <Text style= {{fontSize: 20, textAlign:'center',paddingTop:40, paddingBottom:10}}>ArrayListComponent</Text>
        
        <ScrollView style={styles.scrollView}>
        {
            COUNTRIES.map((country, key) => {
                return (
                    <Text style={styles.text} key = {key}>
                        {country}
                    </Text>
                )
            })
        }
        </ScrollView>
        </SafeAreaView>
    )
}

export default ArrayListComponent; 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 10,
      padding: 10,
    },
    text: {
      fontSize: 14,
      paddingBottom: 6,
    },
    textStor: {
        fontSize: 14,
        paddingBottom: 6,
        fontWeight:'bold',
    },
  });
  