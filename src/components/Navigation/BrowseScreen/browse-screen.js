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

const BrowseStack = createStackNavigator();
const BrowseScreen = (props) => {
  return <BrowseStack.Navigator
    screenOptions={{
      headerStyle: {
        height: 50,
      },
      headerStatusBarHeight: 0,
    }}>
    <BrowseStack.Screen name='Browse' component={Browse}/>
    <BrowseStack.Screen name='ListCourses' component={ListCourses} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='ListPaths' component={ListPaths}/>
    <BrowseStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <BrowseStack.Screen name='PathDetail' component={PathDetail}/>
    <BrowseStack.Screen name='AuthorDetail' component={AuthorDetail}/>
    <BrowseStack.Screen name='CategoryDetail' component={CategoryDetail}/>
    <BrowseStack.Screen name='SkillDetail' component={SkillDetail} options={({ route }) => ({ title: route.params.name })}/>
  </BrowseStack.Navigator>
};

export default BrowseScreen;
