import React, {useContext, useState} from 'react';
import {ActivityIndicator, Modal, View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";
import {Button} from "react-native-elements";
import {apiSendFeedback} from "../../../core/services/user-services";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import CenterActivityIndicator from "../../Common/center-activity-indicator";

const SendFeedback = (props) => {
  const {theme} = useContext(ColorsContext);
  const {state} = useContext(AuthenticationContext)

  const [feedback, setFeedback] = useState({subject: '', content: '', message: ''})
  const [isLoading, setIsLoading] = useState({status: false, success: -1})

  const onPressSend = () => {
    setIsLoading({...isLoading, status: true})
    apiSendFeedback(state.token, feedback).then(res => {
      if(isLoading.status) {
        if(res.status===200) {
          setIsLoading({...isLoading, status: false, success: 1})
        } else {
          setIsLoading({...isLoading, status: false, success: 0})
        }
      }
    }).catch(err => {
      setIsLoading({...isLoading, status: false, success: 0, message: err.response.data.message})
    })
  }

  if(isLoading.status) {
    if(isLoading.success===1) {
      return <View style={{...styles.centeredView, backgroundColor: theme.background}}>
        <Text style={{...styles.textInput, color: theme.text}}>Success! Your feedback has been sent.</Text>
        <Button containerStyle={styles.button} buttonStyle={{paddingHorizontal: 20, backgroundColor: 'gray'}} titleStyle={{fontSize: 18}}
                title={'Cancel'} onPress={() => props.navigation.goBack()}/>
      </View>
    } else if(isLoading.success===0) {
      return <View style={{...styles.centeredView, backgroundColor: theme.background}}>
        <Text style={{...styles.subTitle, color: theme.text}}>Something went wrong! Please try again.</Text>
      </View>
    } else {
      return <CenterActivityIndicator/>
    }
  } else {
    return <ScrollView style={{...styles.centeredView, backgroundColor: theme.background}}>
      <Text style={{...styles.modalTitle, color: theme.text}}>Feedback</Text>
      <View>
        <Text style={{...styles.subTitle, color: theme.text}}>Subject</Text>
        <TextInput style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}} multiline={true} maxLength={200}/>
        <Text style={{...styles.subTitle, color: theme.text}}>Content</Text>
        <TextInput style={{...styles.textInput, backgroundColor: theme.background, color: theme.text}} multiline={true} maxLength={500}/>
      </View>
      <Button containerStyle={styles.button} buttonStyle={{paddingHorizontal: 20, backgroundColor: '#19B5FE'}} titleStyle={{fontSize: 18}}
              title={'Send'} onPress={() => onPressSend()}/>
      <Button containerStyle={styles.button} buttonStyle={{paddingHorizontal: 20, backgroundColor: 'gray'}} titleStyle={{fontSize: 18}}
              title={'Cancel'} onPress={() => props.navigation.goBack()}/>
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
  button: {
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
  }
})
export default SendFeedback;
