import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";

const ForgetPassword = (props) => {
  return <View style={{flex: 1}}>
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
      <Text h2 style={styles.title}>Forgot Password</Text>
      <Text style={styles.content}>Enter your email address and we'll send you a link to reset your password</Text>
      <InputTextSae title={'Email'}/>
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => console.log('Send email')}
        title ='Send Email' />

      <Button
        buttonStyle={[styles.button, {backgroundColor: '#9E9E9E'}]}
        titleStyle={styles.buttonText}
        onPress={() => console.log('Cancel')}
        title ='Cancel' />
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  },
  title: {
    color: 'white',
    textAlign:'center'
  },
  content: {
    color: 'white',
    fontSize: 18,
    marginVertical: 20
  },
  saeContainer: {
    borderRadius: 7,
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },
  saeLabel: {
    color: '#03A9F4',
    fontWeight: '600',
    paddingBottom: 12,
    paddingHorizontal: 10,
  },
  saeInput: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 16,
    marginBottom: -5,
  },
  button: {
    marginVertical: 5,
    borderRadius: 5,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
})
export default ForgetPassword;
