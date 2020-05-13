import React from 'react';
import {View, StyleSheet} from 'react-native';
import Login from "./Login/login";
import ForgetPassword from "./ForgetPassword/forget-password";
import Register from "./Register/register";

const Authentication = (props) => {
  return <View style={styles.container}>
    {/*<Login />*/}
    {/*<ForgetPassword />*/}
    <Register />
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
})
export default Authentication;
