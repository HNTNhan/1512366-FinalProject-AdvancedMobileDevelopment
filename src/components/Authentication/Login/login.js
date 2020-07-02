import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from "react-native-elements";
import {login} from "../../../core/services/authentication-services";
import InputTextSae from "../../Common/input-text-sae";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {usersData} from "../../../testdata/users-data"
import {ColorsContext} from "../../../provider/colors-provider";

const Login = (props) => {
  const {setUser, setUser1} = useContext(AuthenticationContext);
  const {theme} = useContext(ColorsContext)
  const [username, setUsername] = useState('hnmfrv@gmail.com');
  const [password, setPassword] = useState('123456');
  const [status, setStatus] = useState(null);

  if(props.route.params) {
    props.route.params.signOut ? setUser({}) : null;
  } else {

  }

  useEffect(() => {
    setTimeout(() => {

    }, 2000)
    if(status && status.status === 200){
      props.navigation.replace('Main')
    }
  }, [status])

  const RenderLoginStatus = () => {
    if(!status) {
      return <View />
    } else if(status.status === 200){
      const user = usersData.find((user) => user.email===status.userInfo.email)
      setUser(user)
      setUser1(status)
      return <View>
        <Text style={{...styles.message, color: theme.text}}>Login succeeded!</Text>
      </View>
    } else {
      return <View>
        <Text style={{...styles.message, color: theme.text}}>{status.errorString}</Text>
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
                  login(username, password).then(res => {
                      setStatus(res)
                    })
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
