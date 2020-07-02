import React, {useContext} from 'react';
import { TabBar } from 'react-native-tab-view';
import {objectsConstant} from "../../globles/constants";
import {ColorsContext} from "../../provider/colors-provider";

const TabBarStyle = (props) => {
  return <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: objectsConstant.bottomTabOption.activeTintColor }}
    style={{ backgroundColor: props.foreground}}
    labelStyle={{fontWeight: 'bold'}}
    tabStyle={{padding: 0}}
    activeColor={objectsConstant.bottomTabOption.activeTintColor}
    inactiveColor={objectsConstant.bottomTabOption.inactiveTintColor}
  />
};

export default TabBarStyle;
