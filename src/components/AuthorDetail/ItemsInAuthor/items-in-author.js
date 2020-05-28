import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from "../../../globles/styles";
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";

const ItemsInAuthor = (props) => {
  const onPressCourseItem = () => {
    props.navigation.navigate('CourseDetail');
  }

  return <View>
    <Text style={styles.text}>Course</Text>
    { props.items.map((item) => <View style={globalStyles.borderSeparator}>
        <ListCourseItems key={item.id} item={item} onPress={onPressCourseItem}/>
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
