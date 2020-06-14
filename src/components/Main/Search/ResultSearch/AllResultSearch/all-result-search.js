import React from 'react';
import {View} from 'react-native';
import Courses from "../../../../Courses/courses";

const AllResultSearch = (props) => {
  return <View>
    <Courses searchKey={props.searchKey} route={props.route} navigation={props.navigation}/>
  </View>
};

export default AllResultSearch;
