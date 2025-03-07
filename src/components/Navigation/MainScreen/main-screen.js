import React, {useContext, useState} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {objectsConstant} from "../../../globles/constants";
import HomeScreen from "../HomeScreen/home-screen";
import DownloadScreen from "../DownloadScreen/download-screen";
import BrowseScreen from "../BrowseScreen/browse-screen";
import SearchScreen from "../SearchScreen/search-screen";
import {Icon} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";
import {BottomTabBarContext} from "../../../provider/bottom-tab-bar-provider";
import {LanguageContext} from "../../../provider/language-provider";

const bottomTabIcons = (route, focused) => {
  {
    let iconName;
    let color;

    if (route.name === 'Home') {
      iconName = 'home';
      color = focused
        ? objectsConstant.bottomTabOption.activeTintColor
        : objectsConstant.bottomTabOption.inactiveTintColor;
    } else if (route.name === 'Download') {
      iconName = 'arrow-alt-circle-down';
      color = focused
        ? objectsConstant.bottomTabOption.activeTintColor
        : objectsConstant.bottomTabOption.inactiveTintColor;
    } else if (route.name === 'Browse') {
      iconName = 'window-restore';
      color = focused
        ? objectsConstant.bottomTabOption.activeTintColor
        : objectsConstant.bottomTabOption.inactiveTintColor;
    } else if (route.name === 'Search') {
      iconName = 'search';
      color = focused
        ? objectsConstant.bottomTabOption.activeTintColor
        : objectsConstant.bottomTabOption.inactiveTintColor;
    }

    return <Icon name={iconName} type='font-awesome-5' color={color} size={26}/>
  }
}

const MainTab = createBottomTabNavigator();
const MainScreen = (props) => {
  const {theme} = useContext(ColorsContext);
  const {show} = useContext(BottomTabBarContext)
  const {language} = useContext(LanguageContext)

  return <MainTab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => bottomTabIcons(route, focused),
      tabBarVisible: show,
    })}
    tabBarOptions={{...objectsConstant.bottomTabOption, style: {backgroundColor: theme.foreground1, paddingBottom: 0, paddingTop: 0, height: 60}}}
  >
    <MainTab.Screen name="Home" component={HomeScreen} options={{title: language.navigation.signIn}}/>
    <MainTab.Screen name='Download' component={DownloadScreen} options={{title: language.navigation.download}}/>
    <MainTab.Screen name='Browse' component={BrowseScreen} options={{title: language.navigation.browse}}/>
    <MainTab.Screen name='Search' component={SearchScreen} options={{headerShown: false, title: language.navigation.search}}/>
  </MainTab.Navigator>
};

export default MainScreen;
