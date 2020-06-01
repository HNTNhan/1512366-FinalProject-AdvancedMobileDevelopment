import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import Download from "../../Main/Download/download";
import ListCourses from "../../Courses/ListCourses/list-courses";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {objectsConstant} from "../../../globles/constants";

const DownloadStack = createStackNavigator();
const DownloadScreen = (props) => {
  return <DownloadStack.Navigator
    screenOptions={objectsConstant.defaultCenterHeaderBar}>
    <DownloadStack.Screen name='Download' component={Download}/>
    <DownloadStack.Screen name='ListCourses' component={ListCourses}/>
    <DownloadStack.Screen name='CourseDetail' component={CourseDetail}/>
    <DownloadStack.Screen name='AuthorDetail' component={AuthorDetail}/>
  </DownloadStack.Navigator>
};

export default DownloadScreen;
