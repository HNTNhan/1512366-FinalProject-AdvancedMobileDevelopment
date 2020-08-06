import React, {useContext, useEffect, useReducer, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Icon, Text} from "react-native-elements";
import AuthorIconButton from "../../Common/author-icon-button";
import IconButton from "../../Common/icon-button";
import DescriptionOpenClose from "../../Common/description-open-close";
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import AddToChannelDialog from "../../Common/add-to-channel-dialog";
import RatingStart from "../../Common/rating-start";
import {getFavoriteStatus, setFavoriteStatus} from "../../../core/services/user-services";
import {UserContext} from "../../../provider/user-provider";
import {convertDate, convertTime} from "../../Common/convert-data";
import {getInstructorInfo} from "../../../core/services/instructor-services";
import RatingCourse from "../../Common/rating-course";
import {DownloadContext} from "../../../provider/download-provider";
import {alertSignIn} from "../../../globles/alert";

const GeneralCourseDetail = (props) => {
  const {theme} = useContext(ColorsContext);
  const {state} = useContext(AuthenticationContext);
  const {startDownload} = useContext(DownloadContext)
  const userContext = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(false)
  const [rating, setRating] = useState(false)

  const courseDetail = props.detail;
  const [instructorInfo, setInstructorInfo] = useState(props.detail.instructor || null);

  // useEffect(() => {
  //   if(props.courseDownload){
  //     for(let i=0; i<props.courseDownload.section.length; i++) {
  //       if(props.courseDownload.section[i].downloaded) {
  //
  //       } else {
  //         return
  //       }
  //     }
  //   } else {}
  // }, [])

  useEffect(() => {
    let mounted1 = true;
    let mounted2 = true;

    if(!instructorInfo) {
      getInstructorInfo(courseDetail.instructorId).then(res => {
        if(mounted2) {
          if(res.status === 200) {
            setInstructorInfo(res.data.payload)
          } else {}
        } else {}
      }).catch(err => {
        console.log('getInstructorInfo: ', err.response.data.message || err)
      })
    } else {
      getFavoriteStatus(state.token, props.route.params.id)
        .then((res) => {
          if(res.status === 200) {
            if(mounted1){
              if(favorite !== res.data.likeStatus) {
                setFavorite(res.data.likeStatus)
              } else {}
            }
          } else {}
        })
        .catch((err) => {
          console.log('getFavorite: ', err.response.data.message || err)
        })
    }

    return () => {
      mounted1 = false
      mounted2 = false
    }
  }, [])

  useEffect(() => {
    if(userContext.state.favoriteCoursesChange === props.route.params.id) {
      setFavorite(!favorite);
    } else {

    }
  }, [userContext.state.favoriteCoursesChange])

  const authorListItems = (instructorInfo) => {
    return <AuthorIconButton key={instructorInfo.id} instructorInfo={instructorInfo} text={theme.text}
                             onPress={() => onPressAuthorItem(instructorInfo.id, instructorInfo.name, instructorInfo)}/>
  }

  const onPressAuthorItem = (key, name, author) => {
    props.navigation.push('AuthorDetail', {key: key, name: name, author: author})
  }

  const onPressFavortie = () => {
    let mounted = true;
    setFavoriteStatus(state.token, props.route.params.id)
      .then((res) => {
        if(res.status === 200) {
          if(mounted) {
            userContext.favoriteCoursesChange(props.route.params.id)
          }
        } else {
          //return res.data.message
        }
      })
      .catch((err) => {
        alert(err.response.data.message || err)
      })
    return () => mounted = false
  }

  const onSelectAddToChannel = () => {
    setModalVisible(true)
  }

  return <ScrollView showsVerticalScrollIndicator={false}>
    <Text style={{...styles.title, color: theme.text}}>{courseDetail.title}</Text>

    <View style={{...styles.courseContainer}}>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.author}>
            {instructorInfo ? authorListItems(instructorInfo) : null}
          </View>
        </ScrollView>
        <View style={{...styles.subInfo, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, color: theme.text}}>
              {convertDate(courseDetail.updatedAt, 1) + ' . ' + convertTime(courseDetail.totalHours)}
            </Text>
            <RatingStart rating={(courseDetail.formalityPoint + courseDetail.contentPoint + courseDetail.presentationPoint)/3.0} size={12}/>
        </View>
      </View>
      {
        !props.checkOwn ?<View>
          <Button title={'Payment'} type={'outline'} buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitle}
                  icon={<Icon name={'shopping-cart'} type={"font-awesome-5"} size={18} color={'#19B5FE'}/>} iconRight
                  onPress={() => {
                    state.isAuthenticated ? props.navigation.push('Payment', {id: courseDetail.id}) : alertSignIn()
                  }}/>
        </View> : null
      }
    </View>

    <View style={styles.activeContainer}>
      <IconButton name='bookmark-border' title={favorite ? 'UnFavorite' : 'Favorite'} onPress={() => onPressFavortie()}/>
      <IconButton name='cast-connected' title='Add to channel' onPress={() => onSelectAddToChannel()}/>
      <IconButton downloadId={props.downloadId} isDownloading={startDownload} id={courseDetail.id} type={'download'}
                  name='get-app' title={'Download'} onPress={async () => await props.onPressDownload()}/>
    </View>

    <View style={{...styles.descriptionContainer}}>
      <Text style={{...styles.subTitle, color: theme.text}}>Description: </Text>
      <DescriptionOpenClose description={courseDetail.description} noLines={3} text={theme.text} foreground={theme.foreground1}/>
      <Text style={{...styles.subTitle, color: theme.text}}>{'Requirement: '}</Text>
      <Text style={{...styles.text, color: theme.text}}>{courseDetail.requirement.join(`\n`)}</Text>
      <Text style={{...styles.subTitle, color: theme.text}}>{'Learn what: '}</Text>
      <Text style={{...styles.text, color: theme.text}}>{courseDetail.learnWhat.join('\n')}</Text>
    </View>

    <Button
      title='Rating course'
      type='outline'
      icon={
        <Icon name='star' type='font-awesome-5' color='#19B5FE' iconStyle={{marginHorizontal: 8}}/>
      }
      onPress={() => setRating(!rating)}
      containerStyle={{marginVertical: 5}}
    />
    <Button
      title='Take a learning check'
      type='outline'
      icon={
        <Icon name='tasks' type='font-awesome-5' color='#19B5FE' iconStyle={{marginHorizontal: 8}}/>
      }
      containerStyle={{marginVertical: 5}}
    />
    <Button
      title='View related paths & course'
      type='outline'
      icon={
        <Icon name='layer-group' type='font-awesome-5' color='#19B5FE' iconStyle={{marginHorizontal: 8}}/>
      }
      containerStyle={{marginVertical: 5}}
    />
    {rating ? <RatingCourse modalVisible={rating} token={props.token} courseId={props.detail.id}
                            onPressClose={() => setRating(false)}/> : null}
    <AddToChannelDialog modalVisible={modalVisible} courseDetail={props.detail} closeModel={() => setModalVisible(false)}/>
  </ScrollView>
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  author: {
    flexDirection: 'row'
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subInfo: {
    flexDirection: 'row',
  },
  descriptionContainer: {
    marginBottom: 20
  },
  subTitle: {
    fontSize: 16
  },
  text: {
    fontSize: 16,
    paddingLeft: 15
  },
  buttonStyle: {
    marginRight: 10,
    borderColor: '#19B5FE'
  },
  buttonTitle: {
    color: '#19B5FE',
    fontSize: 18
  }
})
export default GeneralCourseDetail;
