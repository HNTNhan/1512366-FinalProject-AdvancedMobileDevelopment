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
import {colors} from "./src/Globles/constants";
import {Icon} from "react-native-elements";
import Login from "./src/components/Authentication/Login/login";
import ForgetPassword from "./src/components/Authentication/ForgetPassword/forget-password";
import Register from "./src/components/Authentication/Register/register";
import SplashScreen from "./src/components/Others/SplashScreen/splash-screen";
import ListPaths from "./src/components/Courses/ListPaths/list-paths";
import PathDetail from "./src/components/PathDetail/path-detail";

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
          ? colors.bottomTab.activeTintColor
          : colors.bottomTab.inactiveTintColor;
      } else if (route.name === 'Download') {
        iconName = 'arrow-alt-circle-down';
        color = focused
          ? colors.bottomTab.activeTintColor
          : colors.bottomTab.inactiveTintColor;
      } else if (route.name === 'Browse') {
        iconName = 'window-restore';
        color = focused
          ? colors.bottomTab.activeTintColor
          : colors.bottomTab.inactiveTintColor;
      } else if (route.name === 'Search') {
        iconName = 'search';
        color = focused
          ? colors.bottomTab.activeTintColor
          : colors.bottomTab.inactiveTintColor;
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
  const HomeScreen = () => {
    return <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={Home}/>
      <HomeStack.Screen name='ListCourses' component={ListCourses}/>
      <HomeStack.Screen name='ListPaths' component={ListPaths}/>
      <HomeStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
      <HomeStack.Screen name='PathDetail' component={PathDetail}/>
    </HomeStack.Navigator>
  }

  const DownloadStack = createStackNavigator();
  const DownloadScreen = () => {
    return <DownloadStack.Navigator>
      <DownloadStack.Screen name='Download' component={Download}/>
      <DownloadStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    </DownloadStack.Navigator>
  }

  const MainTab = createBottomTabNavigator();
  const MainScreen = () => {
    return <MainTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => bottomTabIcons(route, focused),
      })
      }
      tabBarOptions={{
        activeTintColor: colors.bottomTab.activeTintColor,
        inactiveTintColor: colors.bottomTab.inactiveTintColor,
        style: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        labelStyle: {
          fontSize: 16,
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name='Download' component={DownloadScreen}/>
      <Tab.Screen name='Browse' component={Browse}/>
      <Tab.Screen name='Search' component={Search}/>
    </MainTab.Navigator>
  }
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Authentication' component={AuthenticationScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Main' component={MainScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>

    // <View style={styles.container}>
    //   {/*<Home />*/}
    //   {/*<ListCourses />*/}
    //   {/*<Download />*/}
    //   {/*<Browse />*/}
    //   {/*<Search />*/}
    //   {/*<AccountManagement />*/}
    //   {/*<Profile userName={"Thien Nhan"}/>*/}
    //   {/*<Setting userName={"Thien Nhan"} email={'123@gmail.com'}/>*/}
    //   {/*<Authentication />*/}
    //   {/*<CourseDetail />*/}
    //   {/*<LocationMap />*/}
    //   <PathDetail />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
});
