import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SubCourseInfo = (props) => {
  return <View style={styles.detail}>
    <Text>{props.item.title}</Text>
    <Text style={styles.darkText}>{props.item.author.join(', ')}</Text>
    <Text style={styles.darkText}>{`${props.item.level} . ${props.item.released} . ${props.item.duration}`}</Text>
  </View>
};

const styles = StyleSheet.create({
  detail: {
    marginLeft: 5,
    flexShrink: 1,
  },
  darkText: {
    color: 'darkgray',
  },
})

export default SubCourseInfo;
