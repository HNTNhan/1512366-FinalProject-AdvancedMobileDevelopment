import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {colors} from "../../Globles/constants";

const TabBarStyle = (props) => {
  return <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.bottomTab.activeTintColor }}
    style={{ backgroundColor: 'white' }}
    labelStyle={{fontWeight: 'bold'}}
    tabStyle={{padding: 0}}
    activeColor={colors.bottomTab.activeTintColor}
    inactiveColor={colors.bottomTab.inactiveTintColor}
  />
};

export default TabBarStyle;
