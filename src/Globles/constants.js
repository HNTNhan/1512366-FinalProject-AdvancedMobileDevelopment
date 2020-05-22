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
    inactiveTintColor: 'gray',
  },
  defaultBackgroundColor: '#F8F8F8',
}


