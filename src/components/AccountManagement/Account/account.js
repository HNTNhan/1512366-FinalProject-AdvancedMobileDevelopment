import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {Icon, Image} from "react-native-elements";
import ModalActivityIndicator from "../../Common/modal-activity-indicator";
import {checkEmail, checkName, checkPhone} from "../../../core/services/authentication-services";
import {LanguageContext} from "../../../provider/language-provider";

const Account = (props) => {
  const {theme} = useContext(ColorsContext);
  const {language} = useContext(LanguageContext);
  const {state} = useContext(AuthenticationContext);
  const authContext = useContext(AuthenticationContext);

  const initialStateAccount = {
    name: '',
    phone: '',
    avatar: '',
    checkFullName: false,
    checkPhone: false,
    showCheck: false,
  };

  const initialStatePassword = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    checkCurrentPassword: false,
    checkNewPassword: false,
    checkConfirmPassword: false,
    showCheck: false,
  };

  const [account, setAccount] = useState(initialStateAccount);
  const [email, setEmail] = useState({email: '', checkEmail: true})
  const [password, setPassword] = useState(initialStatePassword)
  const [showPassword, setShowPassword] = useState({showCurrentPassword: false, showNewPassword: false, showConfirmPassword: false})

  useEffect(() => {
    if(!authContext.state.userInfo) {
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Authentication'}],
      })
    }
  }, [authContext.state.userInfo])

  useEffect(() => {
    setAccount({...account, name: state.userInfo.name, avatar: state.userInfo.avatar, phone: state.userInfo.phone})
    setEmail({...email, email: state.userInfo.email})
  }, [])

  const onPressUpdateAccount = () => {
    if(checkName(account.name) && (account.phone.length===10 && checkPhone(account.phone))) {
      authContext.updateProfile(state.token, account, language.account.updateProfileSuccess)
      setAccount({...account, checkFullName: checkName(account.name), checkPhone: (account.phone.length===10 && checkPhone(account.phone))})
    } else {
      setAccount({...account, checkFullName: checkName(account.name), checkPhone: (account.phone.length===10 && checkPhone(account.phone)), showCheck: true})
    }
  }

  const onPressChangeEmail = async () => {
    if(checkEmail(email.email)) {
      authContext.changeEmail(state.token, email.email, language.account.updateEmailSuccess)
      //if(!authContext.isUpdatingProfile) {
        //Alert.alert('', language.account.changeEmailSuccess, [{}], { cancelable: true })
      //}
    } else {
      setEmail({...email, checkEmail: false})
    }
  }

  const onPressChangePassword = async () => {
    const checkCurrentPassword = password.currentPassword.length>=8 && password.currentPassword.length<=20;
    const checkNewPassword = password.newPassword.length>=8 && password.newPassword.length<=20;
    const checkConfirmPassword = password.confirmPassword.length>=8 && password.confirmPassword.length<=20;

    if(checkCurrentPassword && checkNewPassword && password.currentPassword!==password.newPassword
      && checkConfirmPassword && password.confirmPassword===password.newPassword) {
      authContext.changePassword(state.token, state.userInfo.id, password, language.account.updatePasswordSuccess)
      setPassword(initialStatePassword)
    } else {
      setPassword({...password, checkConfirmPassword: checkConfirmPassword, checkNewPassword: checkNewPassword, checkCurrentPassword: checkCurrentPassword, showCheck: true})
    }
  }

  return <ScrollView style={{...styles.container, backgroundColor: theme.background}} showsVerticalScrollIndicator={false}>
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>{language.account.yourAccount}</Text>
      </View>
      <View>
        <View style={styles.imageContainer}>
          {
            account.avatar ?
              <Image style={styles.image} source={{uri: account.avatar}} PlaceholderContent={<ActivityIndicator />}/> :
              <Icon name={'user-circle'} size={100} type={"font-awesome-5"}/>
          }
        </View>
        <Text style={{...styles.subTitle, color: theme.text}}>{language.account.avatarLink}</Text>
        <TextInput value={account.avatar}
                   multiline={true}
                   style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}}
                   onChangeText={(text) => setAccount({...account, avatar: text})}
                   numberOfLines={1}
        />

        <Text style={{...styles.subTitle, color: theme.text}}>{language.account.fullName}</Text>
        <TextInput value={account.name}
                   style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}}
                   onChangeText={(text) => setAccount({...account, name: text})}/>
        {
          account.showCheck ? !account.checkFullName ?
            <Text style={{...styles.checkText}}>{language.account.fullNameError}</Text> : null : null
        }

        <Text style={{...styles.subTitle, color: theme.text}}>{language.account.phone}</Text>
        <TextInput value={account.phone}
                   style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}}
                   onChangeText={(text) => setAccount({...account, phone: text})}/>
        {
          account.showCheck ? !account.checkPhone ?
            <Text style={{...styles.checkText}}>{language.account.phoneError}</Text> : null : null
        }

        <TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}} onPress={() => onPressUpdateAccount()}>
          <Text style={{...styles.buttonText, color: theme.text}}>{language.account.updateAccount}</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>{language.account.emailAddress}</Text>
        <Text style={{...styles.text, color: theme.text}}>{language.account.emailNote1}</Text>
        <Text style={{...styles.text, color: theme.text}}>{language.account.emailNote2}</Text>
      </View>

      <View>
        <View>
          <Text style={{...styles.subTitle, color: theme.text}}>{language.account.email}</Text>
          <TextInput value={email.email}
                     style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}}
                     onChangeText={(text) => setEmail({...email, email: text})}/>
          {
            !email.checkEmail ? <Text style={{...styles.checkText}}>{language.account.emailError}</Text> : null
          }
        </View>
        <TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}} onPress={() => onPressChangeEmail()}>
          <Text style={{...styles.buttonText, color: theme.text}}>{language.account.changeEmail}</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>{language.account.password}</Text>
      </View>
      <View>
        <Text style={{...styles.subTitle, color: theme.text}}>{language.account.currentPassword}</Text>
        <View>
          <TextInput secureTextEntry={!showPassword.showCurrentPassword}
                     value={password.currentPassword}
                     style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}}
                     onChangeText={(text) => setPassword({...password, currentPassword: text})}/>
          {
            password.showCheck ? !password.checkCurrentPassword ?
              <Text style={{...styles.checkText}}>{language.account.passwordError1}</Text> : null : null
          }
          {
            password.currentPassword.length ?
            <Icon name={showPassword.showCurrentPassword ? 'eye' : 'eye-slash'} type={"font-awesome-5"} size={16}
                 solid={false} containerStyle={styles.showButton}
                 onPress={() => setShowPassword({
                   ...showPassword,
                   showCurrentPassword: !showPassword.showCurrentPassword
                 })}/> : null
          }
        </View>

        <Text style={{...styles.subTitle, color: theme.text}} >{language.account.newPassword}</Text>
        <View>
          <TextInput secureTextEntry={!showPassword.showNewPassword}
                     value={password.newPassword}
                     style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}}
                     onChangeText={(text) => setPassword({...password, newPassword: text})}/>
          {
            password.showCheck ? !password.checkCurrentPassword ?
              <Text style={{...styles.checkText}}>{language.account.passwordError1}</Text> :
              password.currentPassword===password.newPassword ?
                <Text style={{...styles.checkText}}>{language.account.passwordError2}</Text> : null : null
          }
          {
            password.newPassword.length ?
            <Icon name={showPassword.showNewPassword ? 'eye' : 'eye-slash'} type={"font-awesome-5"} size={16}
                 solid={false} containerStyle={styles.showButton}
                 onPress={() => setShowPassword({...showPassword, showNewPassword: !showPassword.showNewPassword})}/> : null
          }
        </View>

        <Text style={{...styles.subTitle, color: theme.text}} >{language.account.confirmPassword}</Text>
        <View>
          <TextInput secureTextEntry={!showPassword.showConfirmPassword}
                     value={password.confirmPassword}
                     style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}}
                     onChangeText={(text) => setPassword({...password, confirmPassword: text})}/>
          {
            password.showCheck ? !password.checkConfirmPassword ?
              <Text style={{...styles.checkText}}>{language.account.passwordError1}</Text> :
              password.newPassword!==password.confirmPassword ?
                <Text style={{...styles.checkText}}>{language.account.passwordError3}</Text> : null : null
          }
          {
            password.confirmPassword.length ?
            <Icon name={showPassword.showConfirmPassword ? 'eye' : 'eye-slash'} type={"font-awesome-5"} size={16}
                 solid={false} containerStyle={styles.showButton}
                 onPress={() => setShowPassword({
                   ...showPassword,
                   showConfirmPassword: !showPassword.showConfirmPassword
                 })}/> : null
          }
        </View>


        <TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}} onPress={() => onPressChangePassword()}>
          <Text style={{...styles.buttonText, color: theme.text}}>{language.account.update}</Text>
        </TouchableOpacity>
      </View>
    </View>

    {
      state.isUpdatingProfile ? <ModalActivityIndicator modalVisible={true} /> : null
    }

  </ScrollView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: 'white'
  },
  sectionContainer: {
    marginBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  titleContainer: {
    borderBottomWidth: 2,
    borderColor: 'lightgray',
    paddingBottom: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  text: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  changeButton: {
    borderRadius: 50,
    paddingHorizontal: 10,
    borderColor: '#19B5FE'
  },
  changeButtonText: {
    fontSize: 18,
    color: '#19B5FE',
    marginLeft: 5
  },
  checkText: {
    fontSize: 16,
    color: 'red',
  },
  showButton: {
    position: 'absolute',
    right: 5,
    justifyContent: 'center',
    height: '100%',
    padding: 5
  }
})

export default Account;
