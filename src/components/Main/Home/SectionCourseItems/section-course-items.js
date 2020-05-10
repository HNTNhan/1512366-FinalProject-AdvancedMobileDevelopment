import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import SubCourseInfo from "../../../Common/sub-course-info";

const SectionCourseItems = (props) => {

  return <View style={styles.item}>
    <Image source={require('../../../../../assets/ic_course.png')} style={styles.image}/>
    <SubCourseInfo item={props.item}/>
  </View>
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    width: 200,
    height: 215,
    backgroundColor: 'lightgray',
  },
  image: {
    width: 200,
    height: 100,
  },
})

export default SectionCourseItems;
