import React, {createRef, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import {Button} from "react-native-elements";

const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const saeInputText = (title, onChangeText) => {
    return <Sae
      label={title}
      labelStyle={styles.saeLabel}
      inputStyle={styles.saeInput}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={'#03A9F4'}
      inputPadding={3}
      labelHeight={16}
      borderHeight={2}
      autoCapitalize={'none'}
      autoCorrect={false}
      style={styles.saeContainer}
      onChangeText={(text) => {
        title==='Password' ? setPassword(text): setUserName(text)
        console.log(title)
      }}
    />
  }

  return <View style={{flex: 1}}>
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
          {saeInputText('Username (or Email)')}
          {saeInputText('Password')}

          <Button buttonStyle={styles.signInButton}
                  titleStyle={styles.signInButtonText}
                  onPress={() => console.log('sign out')}
                  disabled={userName.length>=3 ? password.length < 6 : true}
                  title = 'SIGN IN' />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => console.log('123')}
            title ='FORGOT PASSWORD' />

          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => console.log('456')}
            title = 'USE SINGLE SIGN-ON (SS0)'/>

          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => console.log('789')}
            title= 'SIGN UP FREE' />
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
    backgroundColor: null,
  },
  signInButton: {
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: '#03A9F4',
  },
  buttonText: {
    color: '#03A9F4',
    textAlign: 'center',
    fontSize: 18,
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
})

export default Login;
