import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from "../../../globles/styles";
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {findByKey} from "../../../testdata/find-data";
import {coursesData} from "../../../testdata/courses-data";
import {ColorsContext} from "../../../provider/colors-provider";

const ItemsInAuthor = (props) => {
  const {theme} = useContext(ColorsContext)

  const onPressCourseItem = (id) => {
    props.navigation.push('CourseDetail', {id: id});
  }

  return <View>
    <Text style={{...styles.text, color: theme.text}}>Course</Text>
    { props.courses.map((item) => <View key={item.id} style={globalStyles.borderSeparator}>
        <ListCourseItems item={{...item, instructorName: props.name}} onPress={() => onPressCourseItem(item.id)}/>
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
