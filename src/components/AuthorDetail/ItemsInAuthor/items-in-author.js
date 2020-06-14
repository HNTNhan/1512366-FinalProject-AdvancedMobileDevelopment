import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from "../../../globles/styles";
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {findByKey} from "../../../testdata/find-data";
import {coursesData} from "../../../testdata/courses-data";
import {ColorsContext} from "../../../provider/colors-provider";

const ItemsInAuthor = (props) => {
  const {theme} = useContext(ColorsContext)
  const courses = findByKey(coursesData, props.courses);

  const onPressCourseItem = (key) => {
    props.navigation.push('CourseDetail', {key: key});
  }

  return <View>
    <Text style={{...styles.text, color: theme.text}}>Course</Text>
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
