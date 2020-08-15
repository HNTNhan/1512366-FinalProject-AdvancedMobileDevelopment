import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator,} from 'react-native';
import VideoPlayer from "./VideoPlayer/video-player";
import GeneralCourseDetail from "./GeneralCourseDetail/general-course-detail";
import ListLessons from "./ListLessons/list-lessons";
import Transcript from "./Transcript/transcript";
import { TabView} from 'react-native-tab-view';
import TabBarStyle from "../Common/tab-bar-style";
import {ColorsContext} from "../../provider/colors-provider";
import {
  getCourseAndLessonsDetail,
  getLastWatchedLesson,
  getUserCourseDetail
} from "../../core/services/course-services";
import {AuthenticationContext} from "../../provider/authentication-provider";
import {checkOwnCourse} from "../../core/services/user-services";
import InfoDialog from "./InfoDialog/info-dialog";
import {DownloadContext} from "../../provider/download-provider";
import {getCoursesDownload} from "../../core/local_storage/courses-download-storage";
import {extractData} from "./Functions/functions";
import {getLessonDetail, getLessonSubtitle, getLessonUrlAndTime} from "../../core/services/lesson-services";
import {LanguageContext} from "../../provider/language-provider";

const initialLayout = { width: Dimensions.get('window').width };

const CourseDetail = (props) => {
  const {theme} = useContext(ColorsContext)
  const {language} = useContext(LanguageContext)
  const {downloadId, setDownloadData, list, setStartDownload, startDownload} = useContext(DownloadContext)
  const {state} = useContext(AuthenticationContext)
  const [checkOwn, setCheckOwn] = useState(false)
  const [detail, setDetail] = useState()
  const [tempDetail, setTempDetail] = useState()
  const [lesson, setLesson] = useState(null)
  const [lessonLocal, setLessonLocal] = useState(null)
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [videoLoading, setVideoLoading] = useState(false)
  const [listAccountAndCourseDownload, setListAccountAndCourseDownload] = useState({data: [], userIndex: -1, courseIndex: -1})
  const [loadingError, setLoadingError] = useState(false)
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: language.courseDetail.titleTab.course },
    { key: 'second', title: language.courseDetail.titleTab.lessons },
    { key: 'third', title: language.courseDetail.titleTab.transcript },
  ]);

  useEffect(() => {
    let mounted = true
    if(!startDownload && state.isAuthenticated){
      getCoursesDownload().then(res => {
        if (res.status === 200 && mounted === true) {
          if (res.data && res.data.length) {
            //console.log('number of user download: ', res.data.length)
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].id === state.userInfo.id && res.data[i].courses.length) {
                //console.log('number of course download: ', res.data[i].courses.length)
                for (let j = 0; j < res.data[i].courses.length; j++) {
                  if (res.data[i].courses[j].id === props.route.params.id) {
                    //console.log(res.data[i].courses[j].id, props.route.params.id)
                    setListAccountAndCourseDownload({data: res.data, userIndex: i, courseIndex: j})
                    break
                  } else if (j === res.data[i].courses.length - 1) {
                    setListAccountAndCourseDownload({data: res.data, userIndex: i, courseIndex: -1})
                  } else {
                  }
                }
                break
              } else if (i === res.data.length) {
                setListAccountAndCourseDownload({data: res.data, userIndex: -1, courseIndex: -1})
              } else {
              }
            }
          } else {
            setListAccountAndCourseDownload({data: [], userIndex: -1, courseIndex: -1})
          }
        } else {
          setListAccountAndCourseDownload(null)
          setLoadingError(true)
        }
      })
    }
    return () => mounted = false
  }, [startDownload])

  //Lay thong tin khoa hoc
  useEffect(() => {
    let mounted = true
    //Kiem tra nguoi dung da dang nhap
    if(state.isAuthenticated) {
      //Kiem tra nguoi dung da mua khoa hoc
      checkOwnCourse(state.token, props.route.params.id)
        .then(res => {
          if(res.status === 200 && mounted===true) {
            let sub_mounted1 = true
            let sub_mounted2 = true
            setCheckOwn(res.data.payload.isUserOwnCourse)
            if(res.data.payload.isUserOwnCourse) {
              getCourseAndLessonsDetail(props.route.params.id, state.token).then(res => {
                if(res.status===200 && sub_mounted1) {
                  const data = extractData(res.data.payload, language.same.lang)
                  getLastWatchedLesson(props.route.params.id, state.token).then(res => {
                    Promise.all([
                      getLessonDetail(props.route.params.id, res.data.payload.lessonId, state.token),
                      getLessonSubtitle(props.route.params.id, res.data.payload.lessonId, state.token),
                      getLessonUrlAndTime(props.route.params.id, res.data.payload.lessonId, state.token)
                    ]).then(res => {
                      const temp = {...res[0].data.payload, subtitle: res[1].data.payload, ...res[2].data.payload}
                      setLesson(temp)
                      setDetail(data)
                      setIsLoading(false)
                      }).catch(err => {
                      setLesson({videoUrl: data.promoVidUrl || null})
                      setDetail(data)
                      setIsLoading(false)
                    })
                  })
                } else {}
              }).catch(err => {
                alert.log(err.response.data.message || err)
              })
              getUserCourseDetail(props.route.params.id, state.userInfo.id)
                .then(res => {
                  if(res.status===200 && sub_mounted2) {
                    setTempDetail(res.data.payload)
                  } else {}
                }).catch(err => {
                alert(err.response.data.message || err)
              })
            } else {
              getUserCourseDetail(props.route.params.id, state.userInfo.id)
                .then(res => {
                  if(res.status===200 && sub_mounted1) {
                    const data = extractData(res.data.payload)
                    setLesson({videoUrl: data.promoVidUrl || null})
                    setDetail(data)
                    setIsLoading(false)
                  } else {}
                }).catch(err => {
                alert(err.response.data.message || err)
              })
            }
          return () => {
              sub_mounted1=false
              sub_mounted2=false
            }
          } else {}
        }).catch(err => {
        alert(err.response.data.message || err)
      })
    } else {
      //Lay thong tin khoa hoc
      getUserCourseDetail(props.route.params.id, '0').then(res => {
        if(res.status === 200 && mounted===true) {
          const data = extractData(res.data.payload)
          setDetail(data)
          setLesson({videoUrl: data.promoVidUrl || null})
          setIsLoading(false)
        } else {}
      }).catch(err => {
        alert(err.response.data.message || err)
      })
    }
    return () => mounted = false
  }, [])

  const onPressLesson = (item) => {
    if(item!==lesson ) {
      setLessonLocal(null)
      setLesson(item)
      setVideoLoading(false)
    } else {}
  }

  const onPressDownload = async () => {
    if(!loadingError) {
      setDownloadData({listAccountAndCourseDownload: listAccountAndCourseDownload, data: [], detail: detail, numberOrder: -1,
        id: props.route.params.id, downloadSection: false})
      setStartDownload(true)
    } else {
      alert(language.courseDetail.downloadError)
    }
  }

  const onPressDownloadSection = async (data, numberOrder) => {
    if(!loadingError) {
      setDownloadData({listAccountAndCourseDownload: listAccountAndCourseDownload, data: data, detail: detail, numberOrder: numberOrder,
        id: props.route.params.id, downloadSection: true})
      setStartDownload(true)
    } else {
      alert(language.courseDetail.downloadError)
    }
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <GeneralCourseDetail
          detail={detail} token={state.token} navigation={props.navigation} route={props.route} checkOwn={checkOwn} downloadId={downloadId}
          coursesLikeCategory={state.isAuthenticated ? (tempDetail ? tempDetail.coursesLikeCategory : detail.coursesLikeCategory) : []}
          ratings={state.isAuthenticated ? (tempDetail ? tempDetail.ratings : detail.ratings) : []}
          courseDownload={
            props.route.params.downloaded ? listAccountAndCourseDownload.courseIndex!==-1 ?
              listAccountAndCourseDownload.data[listAccountAndCourseDownload.userIndex].courses[listAccountAndCourseDownload.courseIndex]
              : null : null}
          onPressDownload={onPressDownload}
        />;
      case 'second':
        return <ListLessons
          courseDetail={detail} courseId={props.route.params.id} onPressLesson={onPressLesson} token={state.token}
          courseDownload={
            listAccountAndCourseDownload.courseIndex!==-1 ?
              listAccountAndCourseDownload.data[listAccountAndCourseDownload.userIndex].courses[listAccountAndCourseDownload.courseIndex] : null}
          checkDownload={props.route.params.downloaded}
          showInfoDialog={() => setShowInfoDialog(true)} videoLoading={() => setVideoLoading(true)}
          isAuthenticated={state.isAuthenticated} checkOwn={checkOwn} onPressDownloadSection={onPressDownloadSection}
        />;
      case 'third':
        return <Transcript transcript={''} isAuthenticated={state.isAuthenticated} checkOwn={checkOwn}/>;
      default:
        return null;
    }
  };

  if(!isLoading) {
    return <View style={{...styles.container, backgroundColor: theme.background}}>
      <VideoPlayer lesson={lessonLocal || lesson} videoLoading={videoLoading} checkOwn={checkOwn} courseId={detail.id} onPressLesson={onPressLesson}
                   setVideoLoading={() => setVideoLoading(true)}/>
      <TabView
        renderTabBar={TabBarStyle}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        sceneContainerStyle={{paddingHorizontal: 5, backgroundColor: theme.background}}
      />
      <InfoDialog modalVisible={showInfoDialog} closeModel={() => setShowInfoDialog(false)}/>
    </View>
  } else {
    return <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size="large" color="#0000ff"/>
    </View>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default CourseDetail;
