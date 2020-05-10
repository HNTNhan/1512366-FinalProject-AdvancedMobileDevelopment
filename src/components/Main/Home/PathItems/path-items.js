import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const PathItems = (props) => {
  console.log(props)
  return <View style={styles.item}>
    <Image source={require('../../../../../assets/ic_course.png')} style={styles.image}/>
    <View style={styles.detail}>
      <Text>{props.item.title}</Text>
      <Text style={styles.darkText}>{props.item.no_courses}</Text>
    </View>
  </View>
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    width: 200,
    height: 150,
    backgroundColor: 'lightgray',
  },
  image: {
    width: 200,
    height: 100,
  },
  detail: {
    margin: 5,
  },
  darkText: {
    color: 'darkgray',
  },
})

export default PathItems;
