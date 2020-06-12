import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../../Main/Home/home";
import ListCourses from "../../Courses/ListCourses/list-courses";
import ListPaths from "../../Courses/ListPaths/list-paths";
import ListChannels from "../../Courses/ListChannels/list-channels";
import CourseDetail from "../../CourseDetail/course-detail";
import PathDetail from "../../PathDetail/path-detail";
import ChannelDetail from "../../ChannelDetail/channel-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {objectsConstant} from "../../../globles/constants";
import IconMainHeaderRight from "../../Common/icon-main-hearder-right";
import PathDetailRightHeader from "../../NavigationHeader/PathDetailHeader/PathDetailRightHeader";


const HomeStack = createStackNavigator();

const HomeScreen = (props) => {
  return <HomeStack.Navigator
    screenOptions={objectsConstant.defaultCenterHeaderBar}>
    <HomeStack.Screen name='Home'
                      component={Home}
                      options={({route, navigation}) => (
                        {headerRight: () => {
                            return <IconMainHeaderRight onPress={() => navigation.navigate('AccountManagement')}/>
                          }}
                      )}/>
    <HomeStack.Screen name='ListCourses' component={ListCourses} options={({ route }) => ({ title: route.params.name })}/>
    <HomeStack.Screen name='ListPaths' component={ListPaths} options={{title: 'Paths'}} />
    <HomeStack.Screen name='ListChannels' component={ListChannels} options={{title: 'Channels'}}/>
    <HomeStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <HomeStack.Screen name='PathDetail'
                      component={PathDetail}
                      options={({route, navigation}) => ({
                        headerRight: () => {
                          return <PathDetailRightHeader route={route} navigation={navigation}/>
                        }
                      })}
    />
    <HomeStack.Screen name='ChannelDetail' component={ChannelDetail}/>
    <HomeStack.Screen name='AuthorDetail' component={AuthorDetail} options={{title: 'Author'}}/>
  </HomeStack.Navigator>
};

export default HomeScreen;
