// Selve importering af moduler
import {Text, View } from 'react-native';
import * as React from "react";
import SignUpForm from "./SignComponents/SignUpForm";

export default function DetailsScreen(navigation) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text></Text>
        <SignUpForm/>
      </View>
    );
  }
