import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Alert, Share} from 'react-native';

const ListCourseItems = (props) => {
  return <TouchableOpacity style={styles.item}
                           onPress={() => {
                             Alert.alert('info', 'Press on list item',
                               [
                                 {
                                   text: 'Cancel',
                                   onPress: () => {
                                     console.log('Cancel')
                                   }
                                 },
                                 {
                                   text: 'Ok',
                                   onPress: () => {
                                     Share.share({
                                       message:"React native with Hook"
                                     })
                                   }
                                 },
                               ])
                           }}
  >
    <Image style={styles.image} source={require('../../../../assets/ic_course.png')} />
    <View style={styles.detail}>
      <Text>{props.item.title}</Text>
      <Text style={styles.darkText}>{props.item.author}</Text>
      <Text style={styles.darkText}>{`${props.item.level} . ${props.item.released} . ${props.item.duration}`}</Text>
    </View>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  image: {
    width: 100,
    height: 50,
  },
  detail: {
    margin: 5,
  },
  darkText: {
    color: 'darkgray',
  },
})

export default ListCourseItems;
