import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';

const ImageScreen = ({ route, navigation }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (route.params && route.params.image) {
      setImage(route.params.image);
    }
  }, [route.params]);

  const handleImagePress = () => {
    navigation.goBack(); // Naviger tilbage til forrige skærm, når der trykkes på billedet
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={{ uri: image ? image.uri : null }}
          style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImageScreen;


/*import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';

const ImageScreen = ({ route, navigation }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (route.params && route.params.image) {
      setImage(route.params.image);
    }
  }, [route.params]);

  const handleImagePress = () => {
    navigation.navigate('ImagesScreen');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={{ uri: image ? image : null }}
          style={{ width: Dimensions.get('window').width, 
          height: Dimensions.get('window').height }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImageScreen
*/