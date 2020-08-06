import React, {useContext} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Alert, Share} from 'react-native';
import SubCourseInfo from "../../Common/sub-course-info";
import CourseDropDownButton from "../../Common/course-drop-down-button";
import {ColorsContext} from "../../../provider/colors-provider";

const ListCourseItems = (props) => {
  const {theme} = useContext(ColorsContext)
  return <View style={styles.container}>
    <TouchableOpacity style={styles.item} onPress={props.onPress} >
      <Image style={{...styles.image, backgroundColor: theme.foreground1}} source={{uri: props.item.courseImage || props.item.imageUrl}} />
      <SubCourseInfo item={props.item} />
    </TouchableOpacity>

    <CourseDropDownButton keyItem={props.item.id} courseDetail={props.item} iconSize={18} type={props.type}/>
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
    width: 100,
    height: 50,
    marginTop: 5
  },
})

export default ListCourseItems;
