import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Download from "../../Main/Download/download";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {objectsConstant} from "../../../globles/constants";
import {ColorsContext} from "../../../provider/colors-provider";
import MainScreenRightHeader from "../../NavigationHeader/MainScreenRightHeader/main-screen-right-header";
import {BottomTabBarContext} from "../../../provider/bottom-tab-bar-provider";

const DownloadStack = createStackNavigator();
const DownloadScreen = (props) => {
  const {theme} = useContext(ColorsContext)

  return <DownloadStack.Navigator
    screenOptions={{...objectsConstant.defaultCenterHeaderBar, headerStyle: {backgroundColor: theme.foreground1}, headerTintColor: theme.text}}>
    <DownloadStack.Screen name='Download'
                          component={Download}
                          options={({route, navigation}) => (
                            {headerRight: () => {
                                return <MainScreenRightHeader route={route} navigation={navigation}/>
                              }}
                          )}
    />
    <DownloadStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <DownloadStack.Screen name='AuthorDetail' component={AuthorDetail} options={({ route }) => ({ title: route.params.name })}/>
  </DownloadStack.Navigator>
};

export default DownloadScreen;
