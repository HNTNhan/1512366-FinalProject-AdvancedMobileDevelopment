import React, {createRef, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import {Button} from "react-native-elements";
import {login} from "../../../core/services/authentication-services";

const Login = (props) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [status, setStatus] = useState(null);
  useEffect(() => {
    if(status && status.status === 200){
      props.navigation.navigate('Main')
    }
  }, [status])

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
      caretHidden={true}
      style={styles.saeContainer}
      value={title==='Password' ? password: username || ''}
      onChangeText={(text) => {
        title==='Password' ? setPassword(text): setUsername(text)
      }}
    />
  }

  const RenderLoginStatus = () => {
    if(!status) {
      return <View />
    } else if(status.status === 200){
      return <Text>Login successed!</Text>
    } else {
      return <View>
        <Text>{status.errorString}</Text>
      </View>
    }
  }

  return <View style={{flex: 1}}>
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
          <RenderLoginStatus />
          {saeInputText('Username (or Email)')}
          {saeInputText('Password')}

          <Button buttonStyle={styles.signInButton}
                  titleStyle={styles.signInButtonText}
                  onPress={() => {
                    setStatus(login(username, password))
                    //props.navigation.navigate('Main')
                  }}
                  title = 'SIGN IN' />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => props.navigation.navigate('ForgetPassword')}
            title ='FORGOT PASSWORD' />

          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => console.log('456')}
            title = 'USE SINGLE SIGN-ON (SS0)'/>

          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => props.navigation.navigate('Register')}
            title= 'SIGN UP FREE' />
        </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    backgroundColor: 'white'
  },
  saeContainer: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'gainsboro',
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  saeLabel: {
    color: '#03A9F4',
    fontWeight: '600',
    paddingBottom: 12,
    paddingHorizontal: 10,
  },
  saeInput: {
    color: 'black',
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
