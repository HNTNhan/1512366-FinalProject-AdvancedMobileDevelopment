import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Button, Icon} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {ColorsContext} from "../../../provider/colors-provider";
// import NetInfo from "@react-native-community/netinfo";
// import {getStoreUserInfo, setStoreUserInfo} from "../../../core/local_storage/authentication-storage";
import {LanguageContext} from "../../../provider/language-provider";
// import * as Google from 'expo-google-app-auth';
// import * as GoogleSignIn from 'expo-google-sign-in';
// import {androidClientID} from "../../../core/services/authentication-services";


const Login = (props) => {
  const {theme} = useContext(ColorsContext)
  const {language} =  useContext(LanguageContext)
  const authContext = useContext(AuthenticationContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pressedSignIn, setPressedSignIn] = useState(false);
  //const [storageData, setStorageData] = useState([]);
  // const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

  // useEffect(() => {
  //   NetInfo.fetch().then(state => {
  //     authContext.changeOnlineStatus(state.isConnected)
  //     getStoreUserInfo().then((res) => {
  //       if(res.status===200) {
  //         if(res.data && res.data.length) {
  //           setStorageData(res.data)
  //         } else {
  //           setStorageData([])
  //         }
  //       } else {
  //         setStorageData(null)
  //       }
  //     })
  //   });
  // }, [])

  useEffect(() => {
    if(authContext.state.isUpdatingProfile) {

    } else {
      if(authContext.state.isAuthenticated) {
        // if(authContext.state.isOnline) {
        //   const currentDate = new Date();
        //   const userInfo = {...authContext.state.userInfo, currentDate: currentDate, password: password};
        //   if(storageData) {
        //     let temp = [...storageData];
        //     if(storageData.length) {
        //       let check=false
        //       for(let i=0; i<storageData.length; i++) {
        //         if(storageData[i].email===email && storageData[i].password===password) {
        //           check=true;
        //           temp[i] = userInfo;
        //           setStoreUserInfo(temp).then()
        //           break;
        //         } else {}
        //       }
        //       if(!check) {
        //         temp.push(userInfo);
        //         setStoreUserInfo(temp).then()
        //       } else {}
        //     } else {
        //       temp.push(userInfo);
        //       setStoreUserInfo(temp).then()
        //     }
        //   } else {}
        // } else {}
        props.navigation.replace('Main')
      } else {}
    }
  }, [authContext])

  const renderLoginStatus = (status) => {
    if (pressedSignIn) {
      if (!authContext.state.isAuthenticating) {
        if (status) {
          return <Text style={{...styles.message, color: '#19B5FE'}}>{language.login.loginSuccess}</Text>
        } else {
          return <Text style={{...styles.message}}>{language.login.loginFail}</Text>
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
    } else {}
    // if(authContext.state.isOnline) {
    //   authContext.login(email, password);
    //   if(!pressedSignIn) {
    //     setPressedSignIn(true)
    //   } else {}
    // } else {
    //   if(storageData) {
    //     const currentDate = new Date();
    //     let temp = [...storageData];
    //
    //     if(storageData.length) {
    //       for(let i=0; i<storageData.length; i++) {
    //         if(storageData[i].email===email && storageData[i].password===password) {
    //           if((currentDate - (new Date(storageData[i].currentDate)))/1000/60/60/24 > 7) {
    //             temp[i] = null;
    //             setStoreUserInfo(temp).then(() => authContext.setUserInfoFromStorage(null))
    //           } else {
    //             authContext.setUserInfoFromStorage({...storageData[i]})
    //           }
    //           break;
    //         } else {}
    //       }
    //       authContext.setUserInfoFromStorage(null)
    //       alert('You need connect to internet to sign in!')
    //     } else {}
    //     alert('You need connect to internet to sign in!')
    //   } else {
    //     alert('You need connect to internet to sign in!')
    //   }
    // }
  }

  // _syncUserWithStateAsync = async () => {
  //   const user = await GoogleSignIn.signInSilentlyAsync();
  //   this.setState({ user });
  // };

  // signOutAsync = async () => {
  //   await GoogleSignIn.signOutAsync();
  //   this.setState({ user: null });
  // };

  // signInAsync = async () => {
  //   try {
  //     await GoogleSignIn.askForPlayServicesAsync();
  //     const { type, user } = await GoogleSignIn.signInAsync();
  //
  //     if (type === 'success') {
  //       setIsGoogleSignIn(false)
  //       authContext.loginWithGoogle(user.email.replace('.', ''), user.id)
  //     }
  //   } catch ({ message }) {
  //     setIsGoogleSignIn(false)
  //     alert('login: Error:' + message);
  //   }
  // };
  //
  // const onPressGoogleSignIn = async () => {
  //   setIsGoogleSignIn(true)
  //   await this.signInAsync()
  // }

  return <View style={{...styles.container, backgroundColor: theme.background}}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
        {renderLoginStatus(authContext.state.isAuthenticated)}
        <InputTextSae title={language.same.email} value={email} onChangeText={onChangeUsername}/>
        <InputTextSae title={language.same.password} value={password} onChangeText={onChangePassword} secureTextEntry={true}/>

        <Button
          disabled={!(email.length > 0 && password.length > 0)}
          buttonStyle={styles.signInButton}
          titleStyle={styles.signInButtonText}
          onPress={() => onPressSignIn()}
          title={language.login.buttonSignIn} />
        {/*<Button*/}
        {/*  buttonStyle={styles.signInButton}*/}
        {/*  titleStyle={styles.signInButtonText}*/}
        {/*  onPress={() => onPressGoogleSignIn()}*/}
        {/*  loading={isGoogleSignIn}*/}
        {/*  title={language.login.buttonSignInWithGoogle} />*/}
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => props.navigation.navigate('Forgot Password')}
          title={language.login.buttonForgot} />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => props.navigation.navigate('Sign Up')}
          title={language.login.buttonSignUp} />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => {
            props.navigation.replace('Main')
          }}
          title={language.login.buttonGuestJoin} />
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
