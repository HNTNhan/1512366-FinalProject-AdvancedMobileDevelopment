import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from "../../../globles/styles";
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {findByKey} from "../../../testdata/find-data";
import {coursesData} from "../../../testdata/courses-data";

const ItemsInAuthor = (props) => {
  const courses = findByKey(coursesData, props.courses);

  const onPressCourseItem = (key) => {
    props.navigation.push('CourseDetail', {key: key});
  }

  return <View>
    <Text style={styles.text}>Course</Text>
    { courses.map((item) => <View key={item.key} style={globalStyles.borderSeparator}>
        <ListCourseItems item={item} onPress={() => onPressCourseItem(item.key)}/>
      </View>
    ) }
  </View>
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
  }
})
export default ItemsInAuthor;
