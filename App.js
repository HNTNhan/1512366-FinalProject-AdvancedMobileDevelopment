import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from "./src/components/Others/SplashScreen/splash-screen";
import AuthenticationScreen from "./src/components/Navigation/AuthenticationScreen/authentication-screen";
import MainScreen from "./src/components/Navigation/MainScreen/main-screen";
import AccountManagementScreen from "./src/components/Navigation/AccountManagementScreen/account-management-screen";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {

  // const HomeStack = createStackNavigator();
  // const HomeScreen = ({navigation}) => {
  //   // React.useEffect(() => {
  //   //   const unsubscribe = navigation.addListener('tabPress', e => {
  //   //     // Prevent default behavior
  //   //     console.log(e)
  //   //     e.preventDefault()
  //   //     navigation.popToTop()
  //   //
  //   //     // Do something manually
  //   //     // ...
  //   //   });
  //   //
  //   //   return unsubscribe;
  //   // }, [navigation]);
  //
  //   return <HomeStack.Navigator
  //             screenOptions={{
  //               headerStyle: {
  //                 height: 50,
  //               },
  //               headerStatusBarHeight: 0,
  //             }}>
  //     <HomeStack.Screen name='Home'
  //                       component={Home}
  //                       options={({route, navigation}) => (
  //                         {headerRight: () => {
  //                             return <Icon name='ellipsis-v'
  //                                   size={20}
  //                                   type='font-awesome-5'
  //                                   containerStyle={{marginRight: 10, paddingHorizontal: 10}}
  //                                   onPress={() => navigation.navigate('AccountManagement')}
  //                             />
  //                         }}
  //                       )}/>
  //     <HomeStack.Screen name='ListCourses' component={ListCourses}/>
  //     <HomeStack.Screen name='ListPaths' component={ListPaths}/>
  //     <HomeStack.Screen name='ListChannel' component={ListChannels}/>
  //     <HomeStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
  //     <HomeStack.Screen name='PathDetail' component={PathDetail}/>
  //     <HomeStack.Screen name='ChannelDetail' component={ChannelDetail}/>
  //     <HomeStack.Screen name='AuthorDetail' component={AuthorDetail}/>
  //   </HomeStack.Navigator>
  // }

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
