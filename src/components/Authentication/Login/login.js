import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Button} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {usersData} from "../../../testdata/users-data"
import {ColorsContext} from "../../../provider/colors-provider";

const Login = (props) => {
  const {setUser} = useContext(AuthenticationContext);
  const {theme} = useContext(ColorsContext)
  const [email, setEmail] = useState(''/*'hnmfrv@gmail.com'*/);
  const [password, setPassword] = useState(''/*'123456789'*/);
  const [pressedSignIn, setPressedSignIn] = useState(false);
  const authContext = useContext(AuthenticationContext)

  if(props.route.params) {
    props.route.params.signOut ? setUser({}) : null;
  } else {

  }

  useEffect(() => {
    if(authContext.state.isAuthenticated){
      const user = usersData.find((user) => user.email===authContext.state.userInfo.email)
      setUser(user)
      props.navigation.replace('Main')
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
    authContext.login(email, password);

    if(!pressedSignIn) {
      setPressedSignIn(true)
    }
    else {

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
