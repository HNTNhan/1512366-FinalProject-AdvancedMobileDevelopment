import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {objectsConstant} from "../../../globles/constants";
import HomeScreen from "../HomeScreen/home-screen";
import DownloadScreen from "../DownloadScreen/download-screen";
import BrowseScreen from "../BrowseScreen/browse-screen";
import SearchScreen from "../SearchScreen/search-screen";
import {Icon} from "react-native-elements";

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
  return <MainTab.Navigator
    screenOptions={({route}) => ({

      tabBarIcon: ({focused}) => bottomTabIcons(route, focused),
    })
    }
    tabBarOptions={objectsConstant.bottomTabOption}
  >
    <MainTab.Screen name="Home" component={HomeScreen}/>
    <MainTab.Screen name='Download' component={DownloadScreen}/>
    <MainTab.Screen name='Browse' component={BrowseScreen}/>
    <MainTab.Screen name='Search' component={SearchScreen} options={{headerShown: false}}/>
  </MainTab.Navigator>
};

export default MainScreen;
