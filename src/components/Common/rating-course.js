import React, {useContext, useEffect, useState} from 'react';
import {Modal, View, StyleSheet, ActivityIndicator, Text, TextInput, Alert} from 'react-native';
import {getRating, ratingCourse} from "../../core/services/course-services";
import CenterActivityIndicator from "./center-activity-indicator";
import {ColorsContext} from "../../provider/colors-provider";
import { Rating, AirbnbRating } from 'react-native-ratings';
import {Button, Icon} from "react-native-elements";

const RatingCourse = (props) => {
  const {theme} = useContext(ColorsContext)

  const [contentPoint, setContentPoint] = useState(0)
  const [formalityPoint, setFormalityPoint] = useState(0)
  const [presentationPoint, setPresentationPoint] = useState(0)
  const [content, setContent] = useState('')
  const [rated, setRated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [ratingSuccess, setRatingSuccess] = useState(false)

  useEffect(() => {
    getRating(props.courseId, props.token).then(res => {
      if(res.status===200) {
        if(res.data.payload) {
          setRated(true)
          setContentPoint(res.data.payload.contentPoint)
          setFormalityPoint(res.data.payload.formalityPoint)
          setPresentationPoint(res.data.payload.presentationPoint)
          setIsLoading(false)
        } else {
          setRated(false)
          setIsLoading(false)
        }
      } else {}
    }).catch(err => {
      alert(err.response.data.message)
    })
  }, [])

  const onPressSave = () => {
    if(content.length<5) {
      Alert.alert('', 'Please type at least 5 character!', [], { cancelable: true })
    } else {
      ratingCourse(props.courseId, formalityPoint, contentPoint, presentationPoint, content, props.token)
        .then((res) => {
          if(res.status===200) {
            setRatingSuccess(true)
          } else {}
        }).catch(err => {
        alert(err.response.data.message)
      })
    }
  }

  if(isLoading) {
    return <CenterActivityIndicator />
  } else {
    return <Modal animationType="fade"
                  transparent={true}
                  visible={props.modalVisible}
                  onRequestClose={props.onPressClose}>
      <View style={{...styles.centeredView}}>
        {
          ratingSuccess ? <View style={{...styles.container, backgroundColor: theme.foreground1}}>
              <Icon name={'check-circle'} type={"font-awesome-5"} color={'green'} size={50}/>
              <Text style={{...styles.mainTitle, color: theme.text}}>Rating Success</Text>
              <Text style={styles.title}>Thank you for your support!</Text>
              <Button title={'OK'} buttonStyle={{marginVertical: 10, width: 100, alignSelf: 'center'}} onPress={() => props.onPressClose()}/>
            </View>
          : <View style={{...styles.container, backgroundColor: theme.foreground1}}>
            <Text style={{...styles.mainTitle, color: theme.text}}>Rating</Text>
            <Text style={{textAlign: 'center', color: theme.text}}>(Please swipe to rate course)</Text>
            <View>
              <View style={styles.subContainer}>
                <Text style={{...styles.title, color: theme.text}}>Content Point: </Text>
                <Rating
                  count={5}
                  startingValue={contentPoint}
                  type={'custom'}
                  ratingBackgroundColor={'lightgray'}
                  fractions={1}
                  imageSize={22}
                  tintColor={theme.foreground1}
                  style={{alignSelf: 'center'}}
                  onFinishRating={(r) => {
                    setContentPoint(r)
                  }}
                />
              </View>
              <View style={styles.subContainer}>
                <Text style={{...styles.title, color: theme.text}}>Formality Point: </Text>
                <Rating
                  count={5}
                  startingValue={formalityPoint}
                  type={'custom'}
                  ratingBackgroundColor={'lightgray'}
                  fractions={1}
                  imageSize={22}
                  style={{alignSelf: 'center'}}
                  tintColor={theme.foreground1}
                  onFinishRating={r => setFormalityPoint(r)}
                />
              </View>
              <View style={styles.subContainer}>
                <Text style={{...styles.title, color: theme.text}}>Presentation Point: </Text>
                <Rating
                  count={5}
                  startingValue={presentationPoint}
                  type={'custom'}
                  ratingBackgroundColor={'lightgray'}
                  fractions={1}
                  imageSize={22}
                  style={{alignSelf: 'center'}}
                  tintColor={theme.foreground1}
                  onFinishRating={r => setPresentationPoint(r)}
                />
              </View>
            </View>
            <View>
              <Text style={{...styles.content, color: theme.text}}>{content.length}/1000</Text>
              <TextInput multiline={true}
                         maxLength={1000}
                         onChangeText={(text) => setContent(text)}
                         placeholder={'Please type at least 5 character!'}
                         style={styles.textInput}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button title={'Cancel'} type={'outline'} titleStyle={{color: 'gray'}}
                      buttonStyle={{borderColor: 'gray', paddingHorizontal: 10, marginTop: 10}}
                      onPress={() => props.onPressClose()}
              />
              <Button title={'Save'} buttonStyle={{paddingHorizontal: 20, marginTop: 10}}
                      onPress={() => onPressSave()}/>
            </View>
          </View>
        }
      </View>
    </Modal>
  }
};

export default RatingCourse;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 18,
  },
  content: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10
  },
  subContainer: {
    flexDirection: 'row',
    marginVertical: 5
  },
  textInput: {
    backgroundColor: 'white',
    height: 105,
    fontSize: 16,
    textAlignVertical: 'top',
    padding: 5,
    borderRadius: 10,
  }
})
