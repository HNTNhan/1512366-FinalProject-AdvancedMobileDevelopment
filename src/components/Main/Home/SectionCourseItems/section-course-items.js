import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import SubCourseInfo from "../../../Common/sub-course-info";
import CourseDropDownButton from "../../../Common/course-drop-down-button";
import {ColorsContext} from "../../../../provider/colors-provider";

const SectionCourseItems = (props) => {
  const {theme} = useContext(ColorsContext)

  return <TouchableOpacity style={{...styles.item, backgroundColor: theme.foreground1}} onPress={props.onPress}>
    <Image source={{uri: props.item.courseImage || props.item.imageUrl}} style={styles.image}/>
    <SubCourseInfo item={props.item} section={true}/>
    <View style={styles.dropDownButton}>
      <CourseDropDownButton keyItem={props.item.id} courseDetail={props.item} iconSize={22}/>
    </View>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    marginRight: 10,
    marginBottom: 10,
    width: 220,
    height: 215,
    backgroundColor: 'rgb(219, 221, 231)',
    shadowColor: 'black',
    shadowOffset: { width: 10, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 25,
  },
  image: {
    width: 220,
    height: 110,
    opacity: 0.9,
  },
  dropDownButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '20%',
    height: '20%',
  }
})

export default SectionCourseItems;
