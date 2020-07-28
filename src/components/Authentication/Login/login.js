import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Button} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {ColorsContext} from "../../../provider/colors-provider";
import NetInfo from "@react-native-community/netinfo";
import {getStoreUserInfo, setStoreUserInfo} from "../../../core/local_storage/authentication-storage";


const Login = (props) => {
  const {theme} = useContext(ColorsContext)
  const [email, setEmail] = useState('hnmfrv@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [pressedSignIn, setPressedSignIn] = useState(false);
  const authContext = useContext(AuthenticationContext)

  useEffect(() => {
    NetInfo.fetch().then(state => {
      authContext.changeOnlineStatus(state.isConnected)
      if(!state.isConnected) {
        getStoreUserInfo().then((res) => {
          if(res.status===200) {
            if(res.data) {
              const now = new Date()
              if((now - (new Date(res.data.currentDate)))/1000/60/60/24 > 7) {
                setStoreUserInfo(null).then(() => authContext.setUserInfoFromStorage(null))
              } else {
                authContext.setUserInfoFromStorage(res.data)
              }
            } else {
              authContext.setUserInfoFromStorage(null)
            }
          } else {
            authContext.setUserInfoFromStorage(null)
          }
        })
      } else {}
    });
  }, [])

  useEffect(() => {
    if(authContext.state.isUpdatingProfile) {

    } else {
      if(authContext.state.isAuthenticated) {
        const currentDate = new Date();
        const userInfo = {...authContext.state.userInfo, currentDate: currentDate, password: password}
        setStoreUserInfo(userInfo).then(r => console.log(r))
        props.navigation.replace('Main')
      } else {}
    }
  }, [authContext])

  const renderLoginStatus = (status) => {
    if (pressedSignIn) {
      if (!authContext.state.isAuthenticating) {
        if (status) {
          return <Text style={{...styles.message, color: theme.text}}>{authContext.state.message}</Text>
        } else {
          return <Text style={{...styles.message}}>{authContext.state.message}</Text>
        }
      } else {
        return <ActivityIndicator size="large" color="#0000ff"/>
      }
    } else {
      return <View/>
    }
  }

  const onChangeUsername = (email) => {
    setEmail(email)
  }

  const onChangePassword = (password) => {
    setPassword(password)
  }

  const onPressSignIn = () => {
    if(authContext.state.isOnline) {
      authContext.login(email, password);

      if(!pressedSignIn) {
        setPressedSignIn(true)
      }
      else {

      }
    } else {
      if(authContext.state.userInfo) {
        props.navigation.replace('Main')
      } else {
        console.log('sadasd')
      }
    }
  }

  return <View style={{...styles.container, backgroundColor: theme.background}}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
        {renderLoginStatus(authContext.state.isAuthenticated)}
        <InputTextSae title='Email' value={email} onChangeText={onChangeUsername}/>
        <InputTextSae title='Password' value={password} onChangeText={onChangePassword} secureTextEntry={true}/>

        <Button
          disabled={!(email.length > 0 && password.length > 0)}
          buttonStyle={styles.signInButton}
          titleStyle={styles.signInButtonText}
          onPress={() => onPressSignIn()}
          title = 'SIGN IN' />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => props.navigation.navigate('Forgot Password')}
          title ='FORGOT PASSWORD' />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => props.navigation.navigate('Sign Up')}
          title= 'SIGN UP FREE' />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => {
            console.log(123)
            props.navigation.replace('Main')
          }}
          title= 'JOIN AS GUEST' />
      </ScrollView>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    justifyContent: 'center',
  },
  button: {
    marginTop: 5,
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: null,
  },
  signInButton: {
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: '#19B5FE',
  },
  buttonText: {
    color: '#19B5FE',
    textAlign: 'center',
    fontSize: 18,
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
    color: 'red'
  }
})

export default Login;
