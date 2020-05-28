import {View} from "react-native";
import React from "react";
import {globalStyles} from "./styles";

export const renderSeparator = () => {
  return (
    <View style={globalStyles.separator} />
  );
};

export const objectsConstant = {
  bottomTabOption: {
    activeTintColor: '#1297E0',
    inactiveTintColor: 'gray',
    style: {
      paddingBottom: 5,
      paddingTop: 5,
      height: 60,
    },
    labelStyle: {
      fontSize: 16,
    }
  },
  defaultCenterHeaderBar: {
    headerStyle: {
      height: 50,
    },
    headerStatusBarHeight: 0,
    headerTitleAlign: 'center'
  },
}


