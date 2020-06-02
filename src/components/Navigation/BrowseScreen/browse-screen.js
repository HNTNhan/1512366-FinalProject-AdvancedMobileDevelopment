import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import Browse from "../../Main/Browse/browse";
import ListCourses from "../../Courses/ListCourses/list-courses";
import ListPaths from "../../Courses/ListPaths/list-paths";
import CourseDetail from "../../CourseDetail/course-detail";
import PathDetail from "../../PathDetail/path-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import CategoryDetail from "../../CategoryDetail/category-detail";
import SkillDetail from "../../SkillDetail/skill-detai";
import {objectsConstant} from "../../../globles/constants";

const BrowseStack = createStackNavigator();
const BrowseScreen = (props) => {
  return <BrowseStack.Navigator
    screenOptions={objectsConstant.defaultCenterHeaderBar}>
    <BrowseStack.Screen name='Browse' component={Browse}/>
    <BrowseStack.Screen name='ListCourses' component={ListCourses} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='ListPaths' component={ListPaths} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <BrowseStack.Screen name='PathDetail' component={PathDetail} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='AuthorDetail' component={AuthorDetail}/>
    <BrowseStack.Screen name='CategoryDetail' component={CategoryDetail} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='SkillDetail' component={SkillDetail} options={({ route }) => ({ title: route.params.name })}/>
  </BrowseStack.Navigator>
};

export default BrowseScreen;
