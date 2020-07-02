import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Text} from "react-native-elements";

const AuthorIconButton = (props) => {
  return <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Image source={{uri: props.instructorInfo.avatar}} style={styles.image}/>
    <Text style={{...styles.text, color: props.text}}>{props.instructorInfo.name}</Text>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingRight: 10,
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 5,
  },
  text: {
    fontSize: 14,
  }
})
export default AuthorIconButton;
