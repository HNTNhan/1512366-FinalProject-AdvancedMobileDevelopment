import React, {useContext, useState} from 'react';
import {ActivityIndicator, Modal, View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";
import {Button} from "react-native-elements";
import {apiSendFeedback} from "../../../core/services/user-services";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import CenterActivityIndicator from "../../Common/center-activity-indicator";
import {LanguageContext} from "../../../provider/language-provider";

const SendFeedback = (props) => {
  const {theme} = useContext(ColorsContext);
  const {language} = useContext(LanguageContext);
  const {state} = useContext(AuthenticationContext)

  const [feedback, setFeedback] = useState({subject: '', content: ''})
  const [isLoading, setIsLoading] = useState({status: false, success: -1, message: ''})
  const [check, setCheck] = useState({subject: false, content: false, show: false})

  const onPressSend = () => {
    if(feedback.subject.length && feedback.content.length) {
      setIsLoading({...isLoading, status: true})
      apiSendFeedback(state.token, feedback).then(res => {
        if(res.status===200) {
          setIsLoading({...isLoading, status: true, success: 1})
        } else {
          setIsLoading({...isLoading, status: true, success: 0})
        }
      }).catch(err => {
        setIsLoading({...isLoading, status: true, success: 0, message: err.response.data.message})
      })
    } else {
      setCheck({...check, show: true, subject: feedback.subject.length>0, content: feedback.content.length>0})
    }
  }

  if(isLoading.status) {
    if(isLoading.success===1) {
      return <View style={{...styles.centeredView, backgroundColor: theme.background}}>
        <Text style={{...styles.text, color: theme.text}}>{language.sendFeedback.success}</Text>
        <Button containerStyle={styles.button} buttonStyle={{paddingHorizontal: 20, backgroundColor: 'gray'}} titleStyle={{fontSize: 18}}
                title={'OK'} onPress={() => props.navigation.goBack()}/>
      </View>
    } else if(isLoading.success===0) {
      return <View style={{...styles.centeredView, backgroundColor: theme.background}}>
        <Text style={{...styles.subTitle, color: theme.text}}>{language.sendFeedback.fail}{isLoading.message}</Text>
      </View>
    } else {
      return <CenterActivityIndicator/>
    }
  } else {
    return <ScrollView style={{...styles.centeredView, backgroundColor: theme.background}}>
      <Text style={{...styles.modalTitle, color: theme.text}}>{language.sendFeedback.feedback}</Text>
      <View>
        <Text style={{...styles.subTitle, color: theme.text}}>{language.sendFeedback.subject}</Text>
        <TextInput style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}}
                   multiline={true} maxLength={200} onChangeText={(text) => setFeedback({...feedback, subject: text})}/>
        {
          !check.subject && check.show ? <Text style={{...styles.text, color: 'red'}}>{language.sendFeedback.note}</Text> : null
        }
        <Text style={{...styles.subTitle, color: theme.text}}>{language.sendFeedback.content}</Text>
        <TextInput style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}}
                   multiline={true} maxLength={500} onChangeText={(text) => setFeedback({...feedback, content: text})}/>
        {
          !check.content && check.show ? <Text style={{...styles.text, color: 'red'}}>{language.sendFeedback.note}</Text> : null
        }
      </View>
      <Button containerStyle={styles.button} buttonStyle={{paddingHorizontal: 20, backgroundColor: '#19B5FE'}} titleStyle={{fontSize: 18}}
              title={language.sendFeedback.send} onPress={() => onPressSend()}/>
      <Button containerStyle={styles.button} buttonStyle={{paddingHorizontal: 20, backgroundColor: 'gray'}} titleStyle={{fontSize: 18}}
              title={language.same.buttonCancel} onPress={() => props.navigation.goBack()}/>
    </ScrollView>
  }
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 5,
    paddingTop: '20%'
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
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
  text: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
})
export default SendFeedback;
