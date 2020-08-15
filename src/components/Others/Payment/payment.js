import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, BackHandler,Alert} from 'react-native';
import {apiPaymentInfo, paymentFreeCourse} from "../../../core/services/payment-services";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import CenterActivityIndicator from "../../Common/center-activity-indicator";
import {Button, Icon} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";
import * as WebBrowser from 'expo-web-browser';
import {UserContext} from "../../../provider/user-provider";
import {LanguageContext} from "../../../provider/language-provider";

const Payment = (props) => {
  const {state} = useContext(AuthenticationContext)
  const {language} = useContext(LanguageContext)
  const {theme} = useContext(ColorsContext)
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const userContext = useContext(UserContext);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if(paymentSuccess) {
          props.navigation.goBack()
          props.navigation.replace('CourseDetail', {id: props.route.params.id})
        } else {
          props.navigation.goBack()
        }
        return true;
      }
    );

    return () => backHandler.remove();
  }, [paymentSuccess]);


  useEffect(() => {
    apiPaymentInfo(props.route.params.id, state.token).then(res => {
      if(res.status===200) {
        if(res.data.didUserBuyCourse) {
          props.navigation.goBack()
          props.navigation.replace('CourseDetail', {id: props.route.params.id})
        } else {
          setPaymentInfo(res.data)
          setIsLoading(false)
        }
      } else {}
    }).catch(err => {
      alert(err.response.data.message)
    })
  }, [])

  const onPressPayment = async () => {
    if(paymentInfo.payload.price) {
      await WebBrowser.openBrowserAsync('https://itedu.me/payment/' + props.route.params.id);
    } else {
      setIsLoading(true)
      paymentFreeCourse(props.route.params.id, state.token)
        .then(res => {
          if(res.status === 200) {
            userContext.requestUpdateContinueLearning()
            setPaymentSuccess(true)
            setIsLoading(false)
          } else {}
        }).catch(err => {
        alert(err.response.data.message || err)
        setIsLoading(false)
      })
    }
  }

  if(isLoading) {
    return <CenterActivityIndicator />
  } else {
    if(paymentSuccess) {
      return <View style={{...styles.container, backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center'}}>
        <Icon name={'check-circle'} type={"font-awesome-5"} color={'green'} size={50}/>
        <Text style={styles.mainTitle}>{language.payment.success}</Text>
        <Text style={styles.title}>{language.payment.successNote}</Text>
        <View style={{flexDirection: 'row'}}>
          <Button buttonStyle={{marginHorizontal: 5, borderColor: theme.text}} titleStyle={{color: theme.text}} title={language.payment.buttonHome}
                  type={"outline"} icon={<Icon name={'home'} type={"font-awesome-5"} size={18} color={theme.text} />}
                  onPress={() => props.navigation.reset({index: 0, routes: [{name: 'Home'}]})}
          />
          <Button buttonStyle={{marginHorizontal: 5, backgroundColor: '#19B5FE'}} title={language.payment.buttonCourse}
                  icon={<Icon name={'leanpub'} type={"font-awesome-5"} size={18} color={'white'} />}
                  onPress={() => {
                    props.navigation.goBack()
                    props.navigation.replace('CourseDetail', {id: props.route.params.id})
                  }}
          />
        </View>
        </View>
    } else {
      return <ScrollView showsVerticalScrollIndicator={false} style={{...styles.container, backgroundColor: theme.background}}>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{...styles.mainTitle, color: theme.text}}>{language.payment.payment}</Text>
        </View>
        <View>
          <View>
            <Text style={{...styles.title, color: theme.text}}>{language.payment.course}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Image source={{uri: paymentInfo.payload.imageUrl}} style={styles.courseImage}/>
            <View>
              <Text style={{...styles.text, color: theme.text}}>
                <Text>{paymentInfo.payload.title} {'\n'}</Text>
                <Text>{paymentInfo.payload.instructorName} {'\n'}</Text>
                <Text style={{fontSize: 18, color: 'red'}}>{paymentInfo.payload.price ? <Text>{paymentInfo.payload.price}đ</Text> : <Text>{language.payment.free}</Text> } {'\n'}</Text>
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={{...styles.title, color: theme.text}}>{language.payment.user}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Image source={{uri: state.userInfo.avatar}} style={styles.userAvatar}/>
            <View>
              <Text style={{...styles.text, color: theme.text}}>
                <Text>{state.userInfo.name} {'\n'}</Text>
                <Text>{state.userInfo.email} {'\n'}</Text>
                <Text>{state.userInfo.phone} {'\n'}</Text>
              </Text>
            </View>
          </View>
        </View>
        <Button title={language.payment.payment} buttonStyle={{alignSelf: 'center', marginBottom: 20}} onPress={() => onPressPayment()}/>
      </ScrollView>
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center'
  },
  courseImage: {
    width: 200,
    height: 100,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5
  },
})
export default Payment;
