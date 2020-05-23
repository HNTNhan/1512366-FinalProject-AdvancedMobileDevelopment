import React from 'react';
import {View} from 'react-native';
import Courses from "../../../../Courses/courses";

const AllResultSearch = (props) => {
  return <View>
    <Courses navigation={props.navigation} route={props.route}/>
  </View>
};

export default AllResultSearch;
