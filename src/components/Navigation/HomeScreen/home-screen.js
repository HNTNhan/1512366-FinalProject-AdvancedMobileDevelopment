import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../../Main/Home/home";
import {Icon} from "react-native-elements";
import ListCourses from "../../Courses/ListCourses/list-courses";
import ListPaths from "../../Courses/ListPaths/list-paths";
import ListChannels from "../../Courses/ListChannels/list-channels";
import CourseDetail from "../../CourseDetail/course-detail";
import PathDetail from "../../PathDetail/path-detail";
import ChannelDetail from "../../ChannelDetail/channel-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {objectsConstant} from "../../../globles/constants";


const HomeStack = createStackNavigator();

const HomeScreen = (props) => {
  return <HomeStack.Navigator
    screenOptions={objectsConstant.defaultCenterHeaderBar}>
    <HomeStack.Screen name='Home'
                      component={Home}
                      options={({route, navigation}) => (
                        {headerRight: () => {
                            return <Icon name='ellipsis-v'
                                         size={20}
                                         type='font-awesome-5'
                                         containerStyle={{marginRight: 10, paddingHorizontal: 10}}
                                         onPress={() => navigation.navigate('AccountManagement')}
                            />
                          }}
                      )}/>
    <HomeStack.Screen name='ListCourses' component={ListCourses}/>
    <HomeStack.Screen name='ListPaths' component={ListPaths}/>
    <HomeStack.Screen name='ListChannel' component={ListChannels}/>
    <HomeStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <HomeStack.Screen name='PathDetail' component={PathDetail}/>
    <HomeStack.Screen name='ChannelDetail' component={ChannelDetail}/>
    <HomeStack.Screen name='AuthorDetail' component={AuthorDetail}/>
  </HomeStack.Navigator>
};

export default HomeScreen;
