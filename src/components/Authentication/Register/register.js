import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View, BackHandler, Alert} from 'react-native';
import {Button, Icon, Text} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";
import {ColorsContext} from "../../../provider/colors-provider";
import {checkEmail, checkName, checkPhone} from "../../../core/services/authentication-services";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import TermsOfUseDialog from "../../Others/TermsOfUse/terms-of-use-dialog";

const Register = (props) => {
  const {theme} = useContext(ColorsContext)
  const authContext = useContext(AuthenticationContext)

  const initialStateUserInfo = {
    // fullName: "abcdefgh",
    // email: "test@gmail.com",
    // password: "123456789",
    // confirmPassword: '123456789',
    // phone: "0385552556",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: '',
    phone: ""
  };

  const initialStateCheckInput = {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    checkBox: false
  };

  const [userInfo, setUserInfo] = useState(initialStateUserInfo);
  const [checkInput, setCheckInput] = useState(initialStateCheckInput);
  const [pressCreateFail, setPressCreateFail] = useState(false)
  const [showTermsOfUse, setShowTermsOfUse]  = useState(false)

  useEffect(() => {
    const backAction = () => {
      if(authContext.state.isRegistered !== null) {
        authContext.registerEnd()
      } else {

      }
      props.navigation.goBack()

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [authContext])

  const onChangeEmail = (email) => {
    if(email.length) {
      let temp = {...checkInput}
      temp.email = checkEmail(email)
      setCheckInput(temp)
      setUserInfo({...userInfo, email: email})
    } else {
      setUserInfo({...userInfo, email: email})
    }
  }

  const onChangeFullName = (fullName) => {
    if(fullName.length) {
      let temp = {...checkInput}
      temp.fullName = checkName(fullName)
      setCheckInput(temp)
      setUserInfo({...userInfo, fullName: fullName})
    } else {
      setUserInfo({...userInfo, fullName: fullName})
    }
  }

  const onChangePassword = (password) => {
    if(password.length) {
      let temp = {...checkInput}
      temp.password = !(password.length<8 || password.length>20)
      temp.confirmPassword = (userInfo.confirmPassword === password)
      setCheckInput(temp)
      setUserInfo({...userInfo, password: password})
    } else {
      setUserInfo({...userInfo, password: password})
    }
  }

  const onChangeConfirmPassword = (confirmPassword) => {
    if(confirmPassword.length) {
      let temp = {...checkInput}
      temp.confirmPassword = (confirmPassword === userInfo.password)
      setCheckInput(temp)
      setUserInfo({...userInfo, confirmPassword: confirmPassword})
    } else {
      setUserInfo({...userInfo, confirmPassword: confirmPassword})
    }
  }

  const onChangePhone = (phone) => {
    if(phone.length) {
      let temp = {...checkInput}
      temp.phone = phone.length===10 || checkPhone(phone)
      setCheckInput(temp)
      setUserInfo({...userInfo, phone: phone})
    } else {
      setUserInfo({...userInfo, phone: phone})
    }
  }

  const onPressCreateAccount = () => {
    if(checkInput.email && checkInput.phone && checkInput.password && checkInput.confirmPassword && checkInput.fullName && checkInput.checkBox){
      authContext.register(userInfo.fullName, userInfo.email, userInfo.phone, userInfo.password)
    } else {
      setPressCreateFail(true)
    }
  }

  if(!authContext.state.isRegistered) {
    return <View style={{flex: 1, backgroundColor: theme.background}}>
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
        <Text h3 style={{...styles.title, color: theme.text}}>Create your account</Text>
        {
          authContext.state.isRegistering ? <ActivityIndicator size="large" color="#0000ff"/> : authContext.state.isRegistered!==null ?
          <Text style={{...styles.failMessage}}>{authContext.state.message || 'Email or phone already exist!'} </Text> : null
        }
        <InputTextSae title={'Email*'} value={userInfo.email} onChangeText={onChangeEmail}/>
        {
          pressCreateFail ? !checkInput.email ? <Text style={{...styles.checkText}}>Invalid email!</Text> : null : null
        }

        <InputTextSae title={'Full Name*'} value={userInfo.fullName} onChangeText={onChangeFullName}/>
        {
          userInfo.fullName ? !checkInput.fullName ?
            <Text style={{...styles.checkText}}>Name cannot contain numbers or special characters like #,%, $,
              ...!</Text> : null : pressCreateFail ? <Text style={{...styles.checkText}}>Please type your full name!</Text> : null
        }

        <InputTextSae title='Password* (8-20 characters)' value={userInfo.password} onChangeText={onChangePassword} secureTextEntry={true}/>
        {
          pressCreateFail ? !checkInput.password ?
            <Text style={{...styles.checkText}}>Password must be between 8 and 20 characters!</Text> : null : null
        }

        <InputTextSae title='Confirm Password*' value={userInfo.confirmPassword} onChangeText={onChangeConfirmPassword} secureTextEntry={true}/>
        {
          userInfo.confirmPassword || userInfo.password ? !checkInput.confirmPassword ?
            <Text style={{...styles.checkText}}>Password and Confirm Password do not match!</Text> : null : null
        }

        <InputTextSae title={'Phone*'} value={userInfo.phone} onChangeText={onChangePhone}/>
        {
          pressCreateFail ? !checkInput.phone ?
            <Text style={{...styles.checkText}}>Please enter a valid phone number!</Text> : null : null
        }

        <Text style={{...styles.text, color: theme.text}}>* Required field</Text>
        <TouchableOpacity onPress={() => setCheckInput({...checkInput, checkBox: !checkInput.checkBox})}>
          <View style={{...styles.checkBoxContainer}}>
            <Icon name={!checkInput.checkBox ? 'square' : 'check-square'} type={"font-awesome-5"} size={18}
                  color={!checkInput.checkBox ? theme.color : '#03A9F4'}/>
            <Text style={{...styles.checkBoxText, color: theme.text}}>
              {'By checking here and continuing, I agree to the '}
              <Text style={{...styles.termsOfUse}} onPress={() => setShowTermsOfUse(true)}>Terms of Use.</Text>
            </Text>
          </View>
        </TouchableOpacity>
        {
          !checkInput.checkBox && pressCreateFail ? <Text style={{...styles.checkText}}>Please check Terms of Use!</Text> : null
        }

        <TermsOfUseDialog modalVisible={showTermsOfUse} closeModel={() => setShowTermsOfUse(false)}/>

        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => onPressCreateAccount()}
          title='Create Account'/>

        <Button
          buttonStyle={[styles.button, {backgroundColor: '#9E9E9E'}]}
          titleStyle={styles.buttonText}
          onPress={() => {
            if(authContext.state.isRegistered !== null) {
              authContext.registerEnd()
            } else {

            }
            props.navigation.goBack()
          }}
          title='Cancel'/>
      </ScrollView>
    </View>
  } else {
    return <View style={{...styles.messageContainer}}>
      <Icon name={'check-circle'} type={"font-awesome-5"} size={60} color={'green'}/>
      <Text style={{...styles.successMessage, color: theme.text}}>Registration complete successfully!</Text>
      <Text style={{...styles.successMessage, fontSize: 16, color: theme.text}}>Please check your registered email for email verification</Text>
      <Button
        buttonStyle={{...styles.button, width: 80}}
        titleStyle={styles.buttonText}
        onPress={() => {
          if(authContext.state.isRegistered !== null) {
            authContext.registerEnd()
          } else {

          }
          setUserInfo(initialStateUserInfo)
          setCheckInput(initialStateCheckInput)
          //props.navigation.goBack()
        }}
        title='OK'/>
    </View>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    textAlign:'center',
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  checkText: {
    color: 'red',
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
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  checkBoxText: {
    fontSize: 16,
    marginLeft: 10,
    flexShrink: 1
  },
  failMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center'
  },
  messageContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  successMessage: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  termsOfUse: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
})
export default Register;
