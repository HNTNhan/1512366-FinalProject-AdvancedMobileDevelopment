import React from 'react';
import {View} from 'react-native';
import AccountManagement from "../../AccountManagement/AccountManagement";
import Profile from "../../AccountManagement/Profile/profile";
import Setting from "../../AccountManagement/Setting/setting";
import {createStackNavigator} from "@react-navigation/stack";
import {objectsConstant} from "../../../globles/constants";

const AccountManagementStack = createStackNavigator();
const AccountManagementScreen = (props) => {
  return <AccountManagementStack.Navigator
    screenOptions={objectsConstant.defaultCenterHeaderBar}>
    <AccountManagementStack.Screen name='AccountManagement' component={AccountManagement} />
    <AccountManagementStack.Screen name='Profile' component={Profile} />
    <AccountManagementStack.Screen name='Setting' component={Setting} />
  </AccountManagementStack.Navigator>
};

export default AccountManagementScreen;
