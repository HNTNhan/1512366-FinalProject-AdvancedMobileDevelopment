import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const ListPathItems = (props) => {
  return <TouchableOpacity style={styles.item} onPress={props.onPress}>
    <Image source={require('../../../../assets/ic_course.png')} style={styles.image}/>
    <View style={styles.detail}>
      <Text>{props.item.detail.title}</Text>
      <Text style={styles.darkText}>{props.item.detail.noCourses}</Text>
    </View>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    width: 90,
    height: 50,
  },
  detail: {
    margin: 5,
  },
  darkText: {
    color: 'darkgray',
  },
})

export default ListPathItems;
