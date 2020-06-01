import React from 'react';
import {View} from 'react-native';
import ListPathItems from "../../Courses/ListPathItems/list-path-items";
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {globalStyles} from "../../../globles/styles";
import {coursesData} from "../../../testdata/courses-data";
import {findByKey} from "../../../testdata/find-data";
import {pathsData} from "../../../testdata/paths-data";

const ItemsInChannel = (props) => {


  const onPressPathItem = (key) => {
    props.navigation.navigate('PathDetail', {key: key});
  }

  const onPressCourseItem = (key) => {
    props.navigation.navigate('CourseDetail', {key: key});
  }
  return <View>
    { props.items.map((item, index) => item.data.length!==0 ? item.typeItem==='path' ?
      <View key={index} style={globalStyles.borderSeparator}>
        <ListPathItems item={findByKey(pathsData, item.data)[0]} onPress={() => onPressPathItem(item.data[0])}/>
      </View>:
      <View key={index} style={globalStyles.borderSeparator}>
        <ListCourseItems key={index} item={findByKey(coursesData, item.data)[0]} onPress={() => onPressCourseItem(item.data[0])}/>
      </View> : null
    ) }
  </View>
};

export default ItemsInChannel;
