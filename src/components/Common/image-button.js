import React, {useContext} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";

const ImageButton = (props) => {
  const {theme} = useContext(ColorsContext)

  const RandomNumber = Math.floor(Math.random() * 8) + 1 ;
  let source;
  switch (RandomNumber) {
    case 1:
      source=require('../../../assets/1.jpg')
      break
    case 2:
      source=require('../../../assets/2.jpg')
      break
    case 3:
      source=require('../../../assets/3.jpg')
      break
    case 4:
      source=require('../../../assets/4.jpg')
      break
    case 5:
      source=require('../../../assets/5.jpg')
      break
    case 6:
      source=require('../../../assets/6.jpg')
      break
    case 7:
      source=require('../../../assets/7.jpg')
      break
    default:
      source=require('../../../assets/8.jpg')
  }

  return <ImageBackground style={styles.imageButton} source={source}>
    <TouchableOpacity
      style={styles.touch}
      onPress={props.onPress}
    >
      <Text style={{...styles.title}}>{props.title}</Text>
    </TouchableOpacity>
  </ImageBackground>
};

const styles = StyleSheet.create({
  imageButton: {
    margin: 5,
    height: 100,
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.8,
  },
  touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
export default ImageButton;
