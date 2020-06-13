import React, {useContext} from 'react';
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
import PathDetailRightHeader from "../../NavigationHeader/PathDetailHeader/PathDetailRightHeader";
import {ColorsContext} from "../../../provider/colors-provider";

const BrowseStack = createStackNavigator();
const BrowseScreen = (props) => {
  const {theme} = useContext(ColorsContext)
  return <BrowseStack.Navigator
    screenOptions={{...objectsConstant.defaultCenterHeaderBar, headerStyle: {backgroundColor: theme.foreground1}, headerTintColor: theme.text}}>
    <BrowseStack.Screen name='Browse' component={Browse}/>
    <BrowseStack.Screen name='ListCourses' component={ListCourses} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='ListPaths' component={ListPaths} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <BrowseStack.Screen name='PathDetail'
                        component={PathDetail}
                        options={({ route, navigation }) => ({
                          title: route.params.name,
                          headerRight: () => {
                            return <PathDetailRightHeader route={route} navigation={navigation}/>
                          }
                        })}
    />
    <BrowseStack.Screen name='AuthorDetail' component={AuthorDetail} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='CategoryDetail' component={CategoryDetail} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='SkillDetail' component={SkillDetail} options={({ route }) => ({ title: route.params.name })}/>
  </BrowseStack.Navigator>
};

export default BrowseScreen;
