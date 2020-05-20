import {View} from "react-native";
import React from "react";
import {globleStyles} from "./styles";

export const renderSeparator = () => {
  return (
    <View style={globleStyles.separator} />
  );
};

export const colors = {
  bottomTab: {
    activeTintColor: '#1297E0',
    inactiveTintColor: '#909090',
  }
}


