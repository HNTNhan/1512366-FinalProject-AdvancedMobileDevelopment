import React, {useContext, useEffect, useReducer, useState} from 'react';
import {View, StyleSheet, ScrollView, Share} from 'react-native';
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
import {alertPayment, alertSignIn} from "../../../globles/alert";
import SectionCourses from "../../Main/Home/SectionCourses/section-courses";
import {getCourseProcess} from "../../../core/services/course-services";
import {LanguageContext} from "../../../provider/language-provider";

const GeneralCourseDetail = (props) => {
  const {theme} = useContext(ColorsContext);
  const {language} = useContext(LanguageContext);
  const {state} = useContext(AuthenticationContext);
  const {startDownload} = useContext(DownloadContext)
  const userContext = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(false)
  const [rating, setRating] = useState(false)
  const [process, setProcess] = useState(null)

  const courseDetail = props.detail;
  const [instructorInfo, setInstructorInfo] = useState(props.detail.instructor || null);


  useEffect(() => {
    let mounted1 = true;
    let mounted2 = true;

    if(state.isAuthenticated) {
      if (!instructorInfo) {
        getInstructorInfo(courseDetail.instructorId).then(res => {
          if (mounted2) {
            if (res.status === 200) {
              setInstructorInfo(res.data.payload)
            } else {}
          } else {
          }
        }).catch(err => {
          alert(err.response.data.message || err)
        })
        getCourseProcess(courseDetail.id, state.token).then(res => {
          setProcess(res.data.payload)
        }).catch(err => {
          setProcess(0)
        })
      } else {}
      getFavoriteStatus(state.token, props.route.params.id)
        .then((res) => {
          if (res.status === 200) {
            if (mounted1) {
              if (favorite !== res.data.likeStatus) {
                setFavorite(res.data.likeStatus)
              } else {
              }
            }
          } else {
          }
        })
        .catch((err) => {
          alert(err.response.data.message || err)
        })
    } else {}

    return () => {
      mounted1 = false
      mounted2 = false
    }
  }, [])

  if(state.isAuthenticated) {
    useEffect(() => {
      if(userContext.state.favoriteCoursesChange === props.route.params.id) {
        setFavorite(!favorite);
      } else {

      }
    }, [userContext.state.favoriteCoursesChange])
  }

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

  const onSelectShare = async () => {
    await Share.share({
      message: 'https://itedu.me/course-detail/' + props.route.params.id
    })
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
              {convertDate(courseDetail.updatedAt, 1, language.same.lang) + ' . '}{process ? convertTime(courseDetail.totalHours * process / 100) + '/': null}{convertTime(courseDetail.totalHours)}
            </Text>
            <RatingStart rating={(courseDetail.formalityPoint + courseDetail.contentPoint + courseDetail.presentationPoint)/3.0} size={14}/>
        </View>
      </View>
      {
        !props.checkOwn ?<View>
          <Button title={language.courseDetail.generalDetail.payment} type={'outline'} buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitle}
                  icon={<Icon name={'shopping-cart'} type={"font-awesome-5"} size={18} color={'#19B5FE'}/>} iconRight
                  onPress={() => {
                    state.isAuthenticated ? props.navigation.push('Payment', {id: courseDetail.id, name: language.courseDetail.generalDetail.payment})
                      : alertSignIn()
                  }}/>
        </View> : null
      }
    </View>

    <View style={styles.activeContainer}>
      <IconButton name='bookmark-border'
                  title={favorite ? language.courseDetail.generalDetail.unFavorite : language.courseDetail.generalDetail.favorite}
                  onPress={() => onPressFavortie()}/>
      <IconButton name='cast-connected' title={language.courseDetail.generalDetail.channel} onPress={() => onSelectAddToChannel()}/>
      <IconButton name='share' title={language.courseDetail.generalDetail.share} onPress={() => onSelectShare()}/>
      <IconButton downloadId={props.downloadId} isDownloading={startDownload} id={courseDetail.id} type={'download'}
                  name='get-app' title={language.courseDetail.generalDetail.download}
                  onPress={async () => props.checkOwn ? await props.onPressDownload() : alertPayment()}/>
    </View>

    <View style={{...styles.descriptionContainer}}>
      <Text style={{...styles.subTitle, color: theme.text}}>{language.courseDetail.generalDetail.description}</Text>
      <DescriptionOpenClose description={courseDetail.description} noLines={3} text={theme.text} foreground={theme.foreground1}/>
      <Text style={{...styles.subTitle, color: theme.text}}>{language.courseDetail.generalDetail.requirement}</Text>
      <Text style={{...styles.text, color: theme.text}}>{courseDetail.requirement.join(`\n`)}</Text>
      <Text style={{...styles.subTitle, color: theme.text}}>{language.courseDetail.generalDetail.learnWhat}</Text>
      <Text style={{...styles.text, color: theme.text}}>{courseDetail.learnWhat.join('\n')}</Text>
    </View>

    <Button
      title={language.courseDetail.generalDetail.rating}
      type='outline'
      icon={
        <Icon name='star' type='font-awesome-5' color='#19B5FE' iconStyle={{marginHorizontal: 8}}/>
      }
      onPress={() => props.checkOwn ? setRating(!rating) : alertPayment()}
      containerStyle={{marginVertical: 5}}
    />
    <Button
      title={language.courseDetail.generalDetail.check}
      type='outline'
      icon={
        <Icon name='tasks' type='font-awesome-5' color='#19B5FE' iconStyle={{marginHorizontal: 8}}/>
      }
      containerStyle={{marginVertical: 5}}
    />
    {rating ? <RatingCourse modalVisible={rating} token={props.token} courseId={props.detail.id} ratings={props.ratings}
                            onPressClose={() => setRating(false)}/> : null}
    <AddToChannelDialog modalVisible={modalVisible} courseDetail={props.detail} closeModel={() => setModalVisible(false)}/>
    {
      props.coursesLikeCategory ?
        <SectionCourses title={language.courseDetail.generalDetail.courseLike}
                       type='Course'
                       navigation={props.navigation}
                       route={props.route}
                       data={props.coursesLikeCategory.slice(0, 8)}
                       pressSeeAll={() => props.navigation.push('ListCourses', {
                         data: props.coursesLikeCategory,
                         title: false,
                         name: language.courseDetail.generalDetail.courseLike
                       })}/> : null
    }
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
