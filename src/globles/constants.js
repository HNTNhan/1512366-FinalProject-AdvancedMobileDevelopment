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
    activeTintColor: '#19B5FE',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 16,
    },
    keyboardHidesTabBar: true,
  },

  defaultCenterHeaderBar: {
    headerStyle: {
      height: 50,
    },
    headerTitleStyle: {
      fontSize: 20,
    },
    headerStatusBarHeight: 0,
    headerTitleAlign: 'center',
  },
}

export const defaultColors = {
  themes: {
    dark: {
      foreground1: '#444444',
      foreground2: '#dddddd',
      background: '#000000',
      text: '#ffffff',
    },
    light: {
      foreground1: '#eeeeee',
      foreground2: '#222222',
      background: '#ffffff',
      text: '#000000',
    }
  },
}

