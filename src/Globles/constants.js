import {View} from "react-native";
import React from "react";
import {globalStyles} from "./styles";

export const renderSeparator = () => {
  return (
    <View style={globalStyles.separator} />
  );
};

export const colors = {
  bottomTab: {
    activeTintColor: '#1297E0',
    inactiveTintColor: '#909090',
  },
  defaultBackgroundColor: '#C0C0C0',
}


