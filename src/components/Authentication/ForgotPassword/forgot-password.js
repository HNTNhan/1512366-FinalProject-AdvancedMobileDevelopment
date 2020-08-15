import React, {useContext, useEffect, useState} from 'react';
import {BackHandler, ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Button, Icon, Text} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {LanguageContext} from "../../../provider/language-provider";

const ForgotPassword = (props) => {
  const {theme} = useContext(ColorsContext)
  const {language} = useContext(LanguageContext)
  const authContext = useContext(AuthenticationContext)
  const [email, setEmail] = useState('');

  useEffect(() => {
    const backAction = () => {
      if(authContext.state.isForgotPassword !== null) {
        authContext.forgotPasswordEnd()
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

  const onPressSendEmail = (email) => {
    authContext.forgotPassword(email)
  }

  const RenderSendEmailStatus = () => {
    if(authContext.state.isForgotPassword===null) {
      return <View />
    } else if(authContext.state.isForgotPassword){
      return <View>
        <Text style={{...styles.message, color: theme.text}}>{language.forgotPass.success}</Text>
      </View>
    } else {
      return <View>
        <Text style={{...styles.message, color: 'red'}}>{language.forgotPass.fail}</Text>
      </View>
    }
  }

  const onChangeEmail = (email) => {
    setEmail(email)
  }

  return <View style={{...styles.container, backgroundColor: theme.background}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!authContext.state.isForgotPassword ? <View>
        <Text style={{...styles.title, color: theme.text}}>{language.forgotPass.title}</Text>
            <Text style={{...styles.content, color: theme.text}}>{language.forgotPass.description}</Text>
            {
              authContext.state.isForgettingPassword ? <ActivityIndicator size="large" color="#0000ff"/> : <RenderSendEmailStatus/>
            }
            <InputTextSae title={language.same.email} value={email} onChangeText={onChangeEmail}/>
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              onPress={() => onPressSendEmail(email)}
              title={language.forgotPass.buttonSend} />
            <Button
              buttonStyle={[styles.button, {backgroundColor: '#9E9E9E'}]}
              titleStyle={styles.buttonText}
              onPress={() => {
                if(authContext.state.isForgotPassword !== null) {
                  authContext.forgotPasswordEnd()
                } else {

                }
                props.navigation.goBack()
              }}
              title={language.same.buttonCancel} />
          </View>
          :
          <View style={{alignItems: 'center'}}>
            <Icon name={'check-circle'} type={"font-awesome-5"} size={60} color={'green'}/>
            <Text style={{...styles.content, fontSize: 20, color: theme.text}}>{language.forgotPass.success}</Text>
            <Button
              buttonStyle={{...styles.button, width: 80}}
              titleStyle={styles.buttonText}
              onPress={() => {
                if(authContext.state.isForgotPassword !== null) {
                  authContext.forgotPasswordEnd()
                } else {

                }
                //props.navigation.goBack()
              }}
              title={language.same.buttonOK}/>
          </View>
        }
      </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 100,
  },
  title: {
    textAlign:'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  content: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10
  },
  button: {
    marginVertical: 5,
    borderRadius: 5,
    paddingVertical: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
  }
})
export default ForgotPassword;
