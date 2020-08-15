import React, {useContext} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../../Authentication/Login/login";
import ForgotPassword from "../../Authentication/ForgotPassword/forgot-password";
import Register from "../../Authentication/Register/register";
import {objectsConstant} from "../../../globles/constants";
import {ColorsContext} from "../../../provider/colors-provider";
import {LanguageContext} from "../../../provider/language-provider";
import {defaultLanguage} from "../../../globles/languages";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";

const AuthenticationStack = createStackNavigator();
const AuthenticationScreen = (props) => {
  const {theme} = useContext(ColorsContext)
  const {language, setLanguage} = useContext(LanguageContext)

  return <AuthenticationStack.Navigator
            screenOptions={{...objectsConstant.defaultCenterHeaderBar,
              headerStyle: {backgroundColor: theme.foreground1},
              headerTintColor: theme.text,
              headerLeft: null,
              headerRight: () => {
                return <TouchableOpacity style={styles.itemContainer}
                                         onPress={() => language===defaultLanguage.English ? setLanguage(defaultLanguage.Vietnamese) : setLanguage(defaultLanguage.English)}>
                    <Text style={{fontSize: 18, color: theme.text}}>
                      {language.same.language}
                    </Text>
                </TouchableOpacity>
              }
            }}>
    <AuthenticationStack.Screen name='Sign In' component={Login} options={{title: language.navigation.signIn}}/>
    <AuthenticationStack.Screen name="Forgot Password" component={ForgotPassword} options={{title: language.navigation.forgotPass}}/>
    <AuthenticationStack.Screen name='Sign Up' component={Register} options={{title: language.navigation.signUp}}/>
  </AuthenticationStack.Navigator>
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
})
export default AuthenticationScreen;
