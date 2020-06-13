import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';

const ImageButton = (props) => {
  return <ImageBackground style={styles.imageButton} source={{uri: 'https://toppng.com/uploads/preview/cool-backgrounds-hd-11553723106ceelmiacll.jpeg'}}>
    <TouchableOpacity
      style={styles.touch}
      onPress={props.onPress}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  </ImageBackground>
};

const styles = StyleSheet.create({
  imageButton: {
    margin: 5,
    height: 100,
    minWidth: 150,
  },
  touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
export default ImageButton;
