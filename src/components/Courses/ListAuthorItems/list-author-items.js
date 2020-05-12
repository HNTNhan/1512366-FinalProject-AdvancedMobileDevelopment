import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ListAuthorItems = (props) => {
  return <TouchableOpacity style={styles.item}>
    <Image source={require('../../../../assets/ic_person.png')} style={styles.image}/>
    <View style={styles.detail}>
      <Text>{props.item.author}</Text>
      <Text style={styles.darkText}>{props.item.no_courses}</Text>
    </View>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  detail: {
    margin: 5,
  },
  darkText: {
    color: 'darkgray',
  },
})
export default ListAuthorItems;
