import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from "react-native-elements";
import {login} from "../../../core/services/authentication-services";
import InputTextSae from "../../Common/input-text-sae";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {usersData} from "../../../testdata/users-data"
import {ColorsContext} from "../../../provider/colors-provider";
import {defaultColors} from "../../../globles/constants";

const Login = (props) => {
  const {setUser} = useContext(AuthenticationContext);
  const {theme, setTheme} = useContext(ColorsContext)
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if(status && status.status === 200){
      props.navigation.replace('Main')
    }
  }, [status])

  const RenderLoginStatus = () => {
    if(!status) {
      return <View />
    } else if(status.status === 200){
      const user = usersData.find((user) => user.name===status.user.username)
      setUser(user)
      return <View>
        <Text style={styles.message}>Login succeeded!</Text>
      </View>
    } else {
      return <View>
        <Text style={styles.message}>{status.errorString}</Text>
      </View>
    }
  }

  const onChangeUsername = (username) => {
    setUsername(username)
  }

  const onChangePassword = (password) => {
    setPassword(password)
  }

  return <View style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <RenderLoginStatus />
        <InputTextSae title='Username (or Email)' value={username} onChangeText={onChangeUsername}/>
        <InputTextSae title='Password' value={password} onChangeText={onChangePassword} secureTextEntry={true}/>

        <Button buttonStyle={styles.signInButton}
                titleStyle={styles.signInButtonText}
                onPress={() => {
                  setStatus(login(username, password))
                }}
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
          onPress={() => theme===defaultColors.themes.light ? setTheme(defaultColors.themes.dark) : setTheme(defaultColors.themes.light)}
          title ='Change Color' />
      </ScrollView>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
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
  }
})

export default Login;
