import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../../Authentication/Login/login";
import ForgotPassword from "../../Authentication/ForgotPassword/forgot-password";
import Register from "../../Authentication/Register/register";
import {objectsConstant} from "../../../globles/constants";

const AuthenticationStack = createStackNavigator();
const AuthenticationScreen = (props) => {
  return <AuthenticationStack.Navigator
            screenOptions={objectsConstant.defaultCenterHeaderBar}>
    <AuthenticationStack.Screen name='Sign In' component={Login} />
    <AuthenticationStack.Screen name="Forgot Password" component={ForgotPassword} />
    <AuthenticationStack.Screen name='Sign Up' component={Register} />
  </AuthenticationStack.Navigator>
};

export default AuthenticationScreen;
