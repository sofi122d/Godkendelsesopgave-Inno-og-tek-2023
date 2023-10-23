// Selve importering af moduler
import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Komponenter
import Add_edit_food from "./StackComponents/Add_edit_food";
import Food_Details from "./StackComponents/Food_Details";
import Overblik from "./StackComponents/Overblik";


//Selve Stack tab
const Stack = createNativeStackNavigator();


export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'pink'} }}>
            <Stack.Screen name="Overblik" component={Overblik} options={{ title: 'Overblik' }}/>
            <Stack.Screen name="Add_edit_food" component={Add_edit_food} options={{ title: 'Tilføj mulighed' }}/>
            <Stack.Screen name="Food_Details" component={Food_Details} options={{ title: 'Detaljer' }}/>
        </Stack.Navigator>
    )};
    
