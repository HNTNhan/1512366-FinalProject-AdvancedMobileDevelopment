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
    marginRight: 10,
    marginBottom: 10,
    width: 200,
    height: 215,
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
})

export default SectionCourseItems;
