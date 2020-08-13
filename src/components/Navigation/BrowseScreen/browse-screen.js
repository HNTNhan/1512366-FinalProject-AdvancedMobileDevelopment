import React, {useContext} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Browse from "../../Main/Browse/browse";
import ListCourses from "../../Courses/ListCourses/list-courses";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import CategoryDetail from "../../CategoryDetail/category-detail";
import {objectsConstant} from "../../../globles/constants";
import {ColorsContext} from "../../../provider/colors-provider";
import MainScreenRightHeader from "../../NavigationHeader/MainScreenRightHeader/main-screen-right-header";
import ListCoursesScrollLoad from "../../Courses/ListCoursesScrollLoad/list-course-scroll-load";
import Payment from "../../Others/Payment/payment";
import SendFeedback from "../../AccountManagement/SendFeedback/send-feedback";

const BrowseStack = createStackNavigator();
const BrowseScreen = (props) => {
  const {theme} = useContext(ColorsContext)
  return <BrowseStack.Navigator
    screenOptions={{...objectsConstant.defaultCenterHeaderBar, headerStyle: {backgroundColor: theme.foreground1}, headerTintColor: theme.text}}>
    <BrowseStack.Screen name='Browse'
                        component={Browse}
                        options={({route, navigation}) => (
                          {headerRight: () => {
                              return <MainScreenRightHeader route={route} navigation={navigation}/>
                        }})}
    />
    <BrowseStack.Screen name='ListCourses' component={ListCourses} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='ListCoursesScrollLoad' component={ListCoursesScrollLoad} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <BrowseStack.Screen name='AuthorDetail' component={AuthorDetail} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='CategoryDetail' component={CategoryDetail} options={({ route }) => ({ title: route.params.name })}/>
    <BrowseStack.Screen name='Payment' component={Payment}/>
    <BrowseStack.Screen name='SendFeedback' component={SendFeedback} options={{title: 'Feedback'}}/>
  </BrowseStack.Navigator>
};

export default BrowseScreen;
