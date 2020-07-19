import React, {useContext} from 'react';
import AccountManagement from "../../AccountManagement/AccountManagement";
import Profile from "../../AccountManagement/Profile/profile";
import Account from "../../AccountManagement/Account/account";
import {createStackNavigator} from "@react-navigation/stack";
import {objectsConstant} from "../../../globles/constants";
import {ColorsContext} from "../../../provider/colors-provider";
import SendFeedback from "../../AccountManagement/SendFeedback/send-feedback";

const AccountManagementStack = createStackNavigator();
const AccountManagementScreen = (props) => {
  const {theme} = useContext(ColorsContext);

  return <AccountManagementStack.Navigator
    screenOptions={{...objectsConstant.defaultCenterHeaderBar, headerStyle: {backgroundColor: theme.foreground1}, headerTintColor: theme.text}}>
    <AccountManagementStack.Screen name='AccountManagement' component={AccountManagement} />
    <AccountManagementStack.Screen name='Account' component={Account} />
    <AccountManagementStack.Screen name='SendFeedback' component={SendFeedback} options={{title: 'Feedback'}}/>
  </AccountManagementStack.Navigator>
};

export default AccountManagementScreen;
