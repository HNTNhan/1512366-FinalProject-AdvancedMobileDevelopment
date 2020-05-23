import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/components/Main/Home/home";
import ListCourses from "./src/components/Courses/ListCourses/list-courses";
import Download from "./src/components/Main/Download/download";
import Browse from "./src/components/Main/Browse/browse";
import Search from "./src/components/Main/Search/search";
import AccountManagement from "./src/components/AccountManagement/AccountManagement";
import Profile from "./src/components/AccountManagement/Profile/profile";
import Setting from "./src/components/AccountManagement/Setting/setting";
import Authentication from "./src/components/Authentication/Authentication";
import CourseDetail from "./src/components/CourseDetail/course-detail";
import LocationMap from "./src/components/Others/LocationMap/location-map";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Button, Icon} from "react-native-elements";
import { colors } from "./src/Globles/constants";
import Login from "./src/components/Authentication/Login/login";
import ForgetPassword from "./src/components/Authentication/ForgetPassword/forget-password";
import Register from "./src/components/Authentication/Register/register";
import SplashScreen from "./src/components/Others/SplashScreen/splash-screen";
import ListPaths from "./src/components/Courses/ListPaths/list-paths";
import PathDetail from "./src/components/PathDetail/path-detail";
import ListChannels from "./src/components/Courses/ListChannels/list-channels";
import ChannelDetail from "./src/components/ChannelDetail/channel-detail";
import AuthorDetail from "./src/components/AuthorDetail/author-detail";
import CategoryDetail from "./src/components/CategoryDetail/category-detail";
import SkillDetail from "./src/components/SkillDetail/skill-detai";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {

  const bottomTabIcons = (route, focused) => {
    {
      let iconName;
      let color;

      if (route.name === 'Home') {
        iconName = 'home';
        color = focused
          ? colors.bottomTabOption.activeTintColor
          : colors.bottomTabOption.inactiveTintColor;
      } else if (route.name === 'Download') {
        iconName = 'arrow-alt-circle-down';
        color = focused
          ? colors.bottomTabOption.activeTintColor
          : colors.bottomTabOption.inactiveTintColor;
      } else if (route.name === 'Browse') {
        iconName = 'window-restore';
        color = focused
          ? colors.bottomTabOption.activeTintColor
          : colors.bottomTabOption.inactiveTintColor;
      } else if (route.name === 'Search') {
        iconName = 'search';
        color = focused
          ? colors.bottomTabOption.activeTintColor
          : colors.bottomTabOption.inactiveTintColor;
      }

      return <Icon name={iconName} type='font-awesome-5' color={color}  size={26}/>
    }
  }

  const AuthenticationStack = createStackNavigator();
  const AuthenticationScreen = () => {
    return <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen name='Login' component={Login} />
      <AuthenticationStack.Screen name='ForgetPassword' component={ForgetPassword} />
      <AuthenticationStack.Screen name='Register' component={Register} />
    </AuthenticationStack.Navigator>
  }

  const HomeStack = createStackNavigator();
  const HomeScreen = ({navigation}) => {
    // React.useEffect(() => {
    //   const unsubscribe = navigation.addListener('tabPress', e => {
    //     // Prevent default behavior
    //     console.log(e)
    //     e.preventDefault()
    //     navigation.popToTop()
    //
    //     // Do something manually
    //     // ...
    //   });
    //
    //   return unsubscribe;
    // }, [navigation]);

    return <HomeStack.Navigator
              screenOptions={{
                headerStyle: {
                  height: 50,
                },
                headerStatusBarHeight: 0,
              }}>
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
  }

  const DownloadStack = createStackNavigator();
  const DownloadScreen = () => {
    return <DownloadStack.Navigator
      screenOptions={{
        headerStyle: {
          height: 50,
        },
        headerStatusBarHeight: 0,
      }}>
      <DownloadStack.Screen name='Download' component={Download}/>
      <DownloadStack.Screen name='ListCourses' component={ListCourses}/>
      <DownloadStack.Screen name='CourseDetail' component={CourseDetail}/>
      <DownloadStack.Screen name='AuthorDetail' component={AuthorDetail}/>
    </DownloadStack.Navigator>
  }

  const BrowseStack = createStackNavigator();
  const BrowseScreen = () => {
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
  }

  const SearchStack = createStackNavigator();
  const SearchScreen = () => {
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
  }

  const MainTab = createBottomTabNavigator();
  const MainScreen = () => {
    return <MainTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => bottomTabIcons(route, focused),
      })}
      tabBarOptions={colors.bottomTabOption}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name='Download' component={DownloadScreen}/>
      <Tab.Screen name='Browse' component={BrowseScreen}/>
      <Tab.Screen name='Search' component={SearchScreen} options={{headerShown: false}}/>
    </MainTab.Navigator>
  }

  const AccountManagementStack = createStackNavigator();
  const AccountManagementScreen = () => {
    return <AccountManagementStack.Navigator
      screenOptions={{
        headerStyle: {
          height: 50,
        },
        headerStatusBarHeight: 0,
      }}>
      <AccountManagementStack.Screen name='AccountManagement' component={AccountManagement} />
      <AccountManagementStack.Screen name='Profile' component={Profile} />
      <AccountManagementStack.Screen name='Setting' component={Setting} />
    </AccountManagementStack.Navigator>
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Authentication' component={AuthenticationScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Main' component={MainScreen} options={{headerShown: false}}/>
          <Stack.Screen name='AccountManagement' component={AccountManagementScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
});
