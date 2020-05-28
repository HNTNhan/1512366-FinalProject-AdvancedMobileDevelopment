import React from 'react';
import {View} from 'react-native';
import Search from "../../Main/Search/search";
import ListCourses from "../../Courses/ListCourses/list-courses";
import ListPaths from "../../Courses/ListPaths/list-paths";
import CourseDetail from "../../CourseDetail/course-detail";
import PathDetail from "../../PathDetail/path-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import CategoryDetail from "../../CategoryDetail/category-detail";
import SkillDetail from "../../SkillDetail/skill-detai";
import {createStackNavigator} from "@react-navigation/stack";

const SearchStack = createStackNavigator();
const SearchScreen = (props) => {
  return <SearchStack.Navigator
    screenOptions={{
      headerStyle: {
        height: 50,
      },
      headerStatusBarHeight: 0,
    }}>
    <SearchStack.Screen name='Search' component={Search} options={{headerShown: false}}/>
    <SearchStack.Screen name='ListCourses' component={ListCourses}/>
    <SearchStack.Screen name='ListPaths' component={ListPaths}/>
    <SearchStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <SearchStack.Screen name='PathDetail' component={PathDetail}/>
    <SearchStack.Screen name='AuthorDetail' component={AuthorDetail}/>
    <SearchStack.Screen name='CategoryDetail' component={CategoryDetail}/>
    <SearchStack.Screen name='SkillDetail' component={SkillDetail}/>
  </SearchStack.Navigator>
};

export default SearchScreen;
