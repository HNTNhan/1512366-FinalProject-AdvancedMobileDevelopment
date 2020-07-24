import React, {useContext} from 'react';
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
import PathDetailRightHeader from "../../NavigationHeader/PathDetailHeader/PathDetailRightHeader";
import {ColorsContext} from "../../../provider/colors-provider";
import MainScreenRightHeader from "../../NavigationHeader/MainScreenRightHeader/main-screen-right-header";
import Profile from "../../AccountManagement/Profile/profile";
import CategoryDetail from "../../CategoryDetail/category-detail";
import ListCoursesScrollLoad from "../../Courses/ListCoursesScrollLoad/list-course-scroll-load";
import {Icon} from "react-native-elements";
import {TouchableOpacity} from 'react-native';
import SendFeedback from "../../AccountManagement/SendFeedback/send-feedback";
import {BottomTabBarContext} from "../../../provider/bottom-tab-bar-provider";

const HomeStack = createStackNavigator();

const HomeScreen = (props) => {
  const {theme} = useContext(ColorsContext)


  return <HomeStack.Navigator
    screenOptions={{...objectsConstant.defaultCenterHeaderBar, headerStyle: {backgroundColor: theme.foreground1}, headerTintColor: theme.text}}>
    <HomeStack.Screen name='Home'
                      component={Home}
                      options={({route, navigation}) => (
                        {headerRight: () => {
                            return <MainScreenRightHeader route={route} navigation={navigation}/>
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
                        },
                        title: route.params.name,
                      })}/>
    <HomeStack.Screen name='ChannelDetail' component={ChannelDetail} options={({ route }) => ({ title: route.params.name })}/>
    <HomeStack.Screen name='AuthorDetail' component={AuthorDetail} options={({ route }) => ({ title: route.params.name })}/>
    <HomeStack.Screen name='Profile'
                      component={Profile}
                      options={({route, navigation}) => ({
                        headerLeft: () => (
                          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Icon name={'arrow-left'} type={"font-awesome-5"} size={18} containerStyle={{paddingLeft: 20}}/>
                          </TouchableOpacity>
                        ),
                      })}/>
    <HomeStack.Screen name='CategoryDetail' component={CategoryDetail} options={({ route }) => ({ title: route.params.name })}/>
    <HomeStack.Screen name='ListCoursesScrollLoad' component={ListCoursesScrollLoad} options={({ route }) => ({ title: route.params.name })}/>
    <HomeStack.Screen name='SendFeedback' component={SendFeedback} options={{title: 'Feedback'}}/>
  </HomeStack.Navigator>
};

export default HomeScreen;
