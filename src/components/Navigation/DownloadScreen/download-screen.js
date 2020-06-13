import React, {useContext} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import Download from "../../Main/Download/download";
import ListCourses from "../../Courses/ListCourses/list-courses";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {objectsConstant} from "../../../globles/constants";
import {ColorsContext} from "../../../provider/colors-provider";

const DownloadStack = createStackNavigator();
const DownloadScreen = (props) => {
  const {theme} = useContext(ColorsContext)

  return <DownloadStack.Navigator
    screenOptions={{...objectsConstant.defaultCenterHeaderBar, headerStyle: {backgroundColor: theme.foreground1}, headerTintColor: theme.text}}>
    <DownloadStack.Screen name='Download' component={Download}/>
    <DownloadStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <DownloadStack.Screen name='AuthorDetail' component={AuthorDetail} options={({ route }) => ({ title: route.params.name })}/>
  </DownloadStack.Navigator>
};

export default DownloadScreen;
