import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Alert, Share} from 'react-native';
import SubCourseInfo from "../../Common/sub-course-info";

const ListCourseItems = (props) => {
  return <TouchableOpacity style={styles.item}
                           onPress={props.onPress}
  >
    <Image style={styles.image} source={require('../../../../assets/ic_course.png')} />
    <SubCourseInfo item={props.item} />
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 5,
  },
  image: {
    width: 100,
    height: 50,
  },
})

export default ListCourseItems;
