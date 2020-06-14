import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Alert, Share} from 'react-native';
import SubCourseInfo from "../../Common/sub-course-info";
import CourseDropDownButton from "../../Common/course-drop-down-button";

const ListCourseItems = (props) => {

  return <View style={styles.container}>
    <TouchableOpacity style={styles.item} onPress={props.onPress} >
      <Image style={styles.image} source={require('../../../../assets/ic_course.png')} />
      <SubCourseInfo item={props.item} />
    </TouchableOpacity>
    <CourseDropDownButton keyItem={props.item.key} iconSize={18}/>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    flex: 20,
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    width: 90,
    height: 50,
  },
})

export default ListCourseItems;
