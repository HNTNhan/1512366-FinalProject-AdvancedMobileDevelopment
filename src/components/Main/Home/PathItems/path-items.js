import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const PathItems = (props) => {
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
    marginRight: 10,
    marginBottom: 10,
    width: 200,
    height: 160,
    backgroundColor: 'rgb(219, 221, 231)',
    shadowColor: 'black',
    shadowOffset: { width: 10, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 25,
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
