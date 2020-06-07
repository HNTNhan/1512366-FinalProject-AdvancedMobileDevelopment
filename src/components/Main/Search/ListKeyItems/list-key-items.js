import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Icon} from "react-native-elements";

const ListKeyItems = (props) => {

  return <View>
    <TouchableOpacity style={styles.keyContainer} onPress={props.onPress}>
      <Icon name={'search'} type='font-awesome-5' color='gray' size={18} containerStyle={styles.image}/>
      <Text style={styles.keyText}>{props.item}</Text>
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  keyContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  image: {
    marginRight: 5,
  },
  keyText: {
    fontSize: 18,
  },
})
export default ListKeyItems;
