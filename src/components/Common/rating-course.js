import React, {useContext, useEffect, useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  Alert,
  Image,
  FlatList
} from 'react-native';
import {getRating, ratingCourse} from "../../core/services/course-services";
import {ColorsContext} from "../../provider/colors-provider";
import { Rating } from 'react-native-ratings';
import {Button, Icon} from "react-native-elements";
import RatingStart from "./rating-start";
import {convertDate} from "./convert-data";
import {globalStyles} from "../../globles/styles";

const RatingCourse = (props) => {
  const {theme} = useContext(ColorsContext)
  const [contentPoint, setContentPoint] = useState(0)
  const [formalityPoint, setFormalityPoint] = useState(0)
  const [presentationPoint, setPresentationPoint] = useState(0)
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [ratingSuccess, setRatingSuccess] = useState(false)

  useEffect(() => {
    getRating(props.courseId, props.token).then(res => {
      if(res.status===200) {
        if(res.data.payload) {
          setContentPoint(res.data.payload.contentPoint)
          setFormalityPoint(res.data.payload.formalityPoint)
          setPresentationPoint(res.data.payload.presentationPoint)
          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      } else {}
    }).catch(err => {
      alert(err.response.data.message)
      setIsLoading(false)
      props.onPressClose()
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

  const RatingBar = (ratingBarProps) => {
    return <View style={{...styles.subRatingContainer}}>
      <Text style={{fontSize: 20}}>{ratingBarProps.star}</Text>
      <Icon name={'star'} type={"font-awesome-5"} size={20} color={'#FBDC14'} containerStyle={{justifyContent: 'center'}} solid={true}/>
      <View style={{...styles.ratingBar}}>
        <View style={{height: '100%', width: `${ratingBarProps.percent}%`, backgroundColor: 'gray', borderRadius: 10}}/>
      </View>
      <Text style={{fontSize: 18, color: 'gray'}}> ({ratingBarProps.percent}%)</Text>
    </View>
  }

  const ratingListHeader = () => {
    return <View>
      <Text style={{...styles.mainTitle, color: theme.text}}>Rating</Text>
      <Text style={{...styles.mainTitle, color: theme.text, fontSize: 20}}>({props.ratings.ratingList.length} rating)</Text>
      <View style={{marginTop: 10}}>
        <RatingBar percent={props.ratings.stars[4]} star={5}/>
        <RatingBar percent={props.ratings.stars[3]} star={4}/>
        <RatingBar percent={props.ratings.stars[2]} star={3}/>
        <RatingBar percent={props.ratings.stars[1]} star={2}/>
        <RatingBar percent={props.ratings.stars[0]} star={1}/>
      </View>
    </View>
  }

  const ratingListItem = ({item}) => {
    return <View key={item.id} style={{flexDirection: 'row', marginBottom: 10}}>
      <View style={{width: '30%'}}>
        <Image source={{uri: item.user.avatar}} style={{width: 50, height: 50, borderRadius: 50}}/>
        <Text>{item.user.name}</Text>
      </View>
      <View style={{width: '70%'}}>
        <RatingStart size={16} rating={item.averagePoint} />
        <Text>{convertDate(item.createdAt)}</Text>
        <Text>{item.content}</Text>
      </View>
    </View>
  }

  if(isLoading) {
    return <View style={{...styles.activityIndicatorContainer}}>
      <ActivityIndicator size={'large'} color={'blue'}/>
    </View>
  } else {
    return <Modal animationType="fade"
                  transparent={true}
                  visible={props.modalVisible}
                  onRequestClose={props.onPressClose}>
      <View style={{...styles.centeredView}}>
        {
          ratingSuccess ?
            <View style={{...styles.container, backgroundColor: theme.foreground1}}>
              <Icon name={'check-circle'} type={"font-awesome-5"} color={'green'} size={50}/>
              <Text style={{...styles.mainTitle, color: theme.text}}>Rating Success</Text>
              <Text style={styles.title}>Thank you for your support!</Text>
              <Button title={'OK'} buttonStyle={{marginVertical: 10, width: 100, alignSelf: 'center'}} onPress={() => props.onPressClose()}/>
            </View> :
            <View style={{...styles.container, backgroundColor: theme.foreground1}}>
              <FlatList showsVerticalScrollIndicator={false}
                        data={props.ratings.ratingList}
                        renderItem={ratingListItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={ratingListHeader}
                        ListHeaderComponentStyle={{marginBottom: 10}}
                        ItemSeparatorComponent= {() => <View style={globalStyles.separator} />}
              />
              <View style={{backgroundColor: 'black', width: '100%', height: 2}} />
              <Text style={{...styles.mainTitle, color: theme.text}}>Your Rating</Text>
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
  activityIndicatorContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    width: '100%'
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    width: '100%',
    height: '100%'
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
  },
  content: {
    fontSize: 16,
    textAlign: 'right',
  },
  subContainer: {
    flexDirection: 'row',
    marginVertical: 5
  },
  textInput: {
    backgroundColor: 'white',
    height: 70,
    fontSize: 16,
    textAlignVertical: 'top',
    padding: 5,
    borderRadius: 10,
  },
  totalRatingContainer: {

  },
  subRatingContainer: {
    flexDirection: 'row',
  },
  ratingBar: {
    backgroundColor: 'lightgray',
    width: '70%',
    height: 10,
    alignSelf: 'center',
    borderRadius: 10
  },
})
