import {Text, View, FlatList, StyleSheet, StatusBar} from 'react-native';
import * as React from "react";
import { CARS } from '../../const';


const FlatListComponent = (props) => { 
    return(
        <View style={styles.container}>
            <Text style={{ fontSize: 20, textAlign:'center',paddingTop:40, paddingBottom:10}}>
                Flatlist
            </Text>
            <FlatList
                style={styles.scrollView}
                data={CARS}
                renderItem={({item})=>{
                    return(
                        <CarItem
                            item={item}
                            msg={"Bil:"}
                        />
                    )
                }}
                keyExtractor={item => item}
            />

        </View>
    )

}

const CarItem = ({item,msg}) => {
    return(<Text>{msg} "{item}"</Text>)}


export default FlatListComponent; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      },

    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 10,
      padding: 10,
      height:200,
    },
  });