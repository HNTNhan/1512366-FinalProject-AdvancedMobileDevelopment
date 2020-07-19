import React from 'react';
import {View} from 'react-native';
import Search from "../../Main/Search/search";
import ListCourses from "../../Courses/ListCourses/list-courses";
import ListPaths from "../../Courses/ListPaths/list-paths";
import CourseDetail from "../../CourseDetail/course-detail";
import PathDetail from "../../PathDetail/path-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {createStackNavigator} from "@react-navigation/stack";
import {objectsConstant} from "../../../globles/constants";
import PathDetailRightHeader from "../../NavigationHeader/PathDetailHeader/PathDetailRightHeader";

const SearchStack = createStackNavigator();

const SearchScreen = (props) => {
  return <SearchStack.Navigator
      screenOptions={objectsConstant.defaultCenterHeaderBar}>
      <SearchStack.Screen name='Search' component={Search} options={{headerShown: false}}/>
      <SearchStack.Screen name='ListCourses' component={ListCourses}/>
      <SearchStack.Screen name='ListPaths' component={ListPaths}/>
      <SearchStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
      <SearchStack.Screen name='PathDetail'
                          component={PathDetail}
                          options={({route, navigation}) => ({
                            headerRight: () => {
                              return <PathDetailRightHeader route={route} navigation={navigation}/>
                            },
                            title: route.params.name
                          })}
      />
      <SearchStack.Screen name='AuthorDetail' component={AuthorDetail} options={({ route }) => ({ title: route.params.name })}/>
    </SearchStack.Navigator>
};

export default SearchScreen;
