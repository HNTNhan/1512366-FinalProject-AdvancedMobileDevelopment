import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";
import {forgetPassword} from "../../../core/services/authentication-services";
import {ColorsContext} from "../../../provider/colors-provider";

const ForgotPassword = (props) => {
  const {theme} = useContext(ColorsContext)
  const [email, setEmail] = useState('admin@email.com');
  const [status, setStatus] = useState(null);

  const RenderEmailStatus = () => {
    if(!status) {
      return <View />
    } else if(status.status === 404){
      return <View>
        <Text style={{...styles.message, color: theme.text}}>{status.errorString}</Text>
      </View>
    } else {
      return <View />
    }
  }

  const onChangeEmail = (email) => {
    setEmail(email)
  }

  return <View style={{...styles.container, backgroundColor: theme.background}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text h2 style={{...styles.title, color: theme.text}}>Forgot Password</Text>
        {status===null||status.status!==200 ?
          <View>
            <Text style={{...styles.content, color: theme.text}}>Enter your email address and we'll send you a link to reset your password</Text>
            <RenderEmailStatus />
            <InputTextSae title={'Email'} value={email} onChangeText={onChangeEmail}/>
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              onPress={() => setStatus(forgetPassword(email))}
              title ='Send Email' />
            <Button
              buttonStyle={[styles.button, {backgroundColor: '#9E9E9E'}]}
              titleStyle={styles.buttonText}
              onPress={() => props.navigation.goBack()}
              title ='Cancel' />
          </View>
          :
          <Text style={{...styles.content, color: theme.text}}>{status.message}</Text>
        }
      </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  title: {
    textAlign:'center',
  },
  content: {
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
