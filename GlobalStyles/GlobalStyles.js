import {Platform, StyleSheet} from 'react-native'

const GlobalStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      ...Platform.select({
        ios: {
          backgroundColor: 'pink',
        },
        android: {
          backgroundColor: 'green',
        },
        default: {
          // other platforms, web for example
          backgroundColor: 'blue',
        },
      }),
    },
    defaultColor: {
        backgroundColor: 'palevioletred',
        padding: 10,
        margin: 15,
    },
    color: {
        backgroundColor: 'plum',
        padding: 10,
        margin: 15,
    },
  });
  

export default GlobalStyles 