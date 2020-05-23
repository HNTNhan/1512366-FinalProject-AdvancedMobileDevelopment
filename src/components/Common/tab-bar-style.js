import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {colors} from "../../Globles/constants";

const TabBarStyle = (props) => {
  return <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.bottomTabOption.activeTintColor }}
    style={{ backgroundColor: 'white' }}
    labelStyle={{fontWeight: 'bold'}}
    tabStyle={{padding: 0}}
    activeColor={colors.bottomTabOption.activeTintColor}
    inactiveColor={colors.bottomTabOption.inactiveTintColor}
  />
};

export default TabBarStyle;
