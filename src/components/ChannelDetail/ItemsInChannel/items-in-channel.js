import React from 'react';
import {View} from 'react-native';
import ListPathItems from "../../Courses/ListPathItems/list-path-items";
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {globalStyles} from "../../../globles/styles";


const ItemsInChannel = (props) => {
  const onPressPathItem = () => {
    props.navigation.navigate('PathDetail');
  }

  const onPressCourseItem = () => {
    props.navigation.navigate('CourseDetail');
  }

  return <View>
    { props.items.map((item) => item.typeItem==='path' ?
      <View style={globalStyles.borderSeparator}>
        <ListPathItems key={item.data.id} item={item.data} onPress={onPressPathItem}/>
      </View> :
      <View style={globalStyles.borderSeparator}>
        <ListCourseItems key={item.data.id} item={item.data} onPress={onPressCourseItem}/>
      </View>
    ) }
  </View>
};

export default ItemsInChannel;
