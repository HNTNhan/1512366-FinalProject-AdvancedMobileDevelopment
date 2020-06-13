import React, {useContext} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../../Authentication/Login/login";
import ForgotPassword from "../../Authentication/ForgotPassword/forgot-password";
import Register from "../../Authentication/Register/register";
import {objectsConstant} from "../../../globles/constants";
import {ColorsContext} from "../../../provider/colors-provider";

const AuthenticationStack = createStackNavigator();
const AuthenticationScreen = (props) => {
  const {theme} = useContext(ColorsContext)
  return <AuthenticationStack.Navigator
            screenOptions={{...objectsConstant.defaultCenterHeaderBar, headerStyle: {backgroundColor: theme.foreground1}, headerTintColor: theme.text}}>
    <AuthenticationStack.Screen name='Sign In' component={Login} />
    <AuthenticationStack.Screen name="Forgot Password" component={ForgotPassword} />
    <AuthenticationStack.Screen name='Sign Up' component={Register} />
  </AuthenticationStack.Navigator>
};

export default AuthenticationScreen;
