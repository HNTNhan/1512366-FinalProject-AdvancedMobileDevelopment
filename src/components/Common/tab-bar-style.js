import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {objectsConstant} from "../../globles/constants";

const TabBarStyle = (props) => {
  return <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: objectsConstant.bottomTabOption.activeTintColor }}
    style={{ backgroundColor: 'white' }}
    labelStyle={{fontWeight: 'bold'}}
    tabStyle={{padding: 0}}
    activeColor={objectsConstant.bottomTabOption.activeTintColor}
    inactiveColor={objectsConstant.bottomTabOption.inactiveTintColor}
  />
};

export default TabBarStyle;
