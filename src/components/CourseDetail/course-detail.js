import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator,} from 'react-native';
import VideoPlayer from "./VideoPlayer/video-player";
import GeneralCourseDetail from "./GeneralCourseDetail/general-course-detail";
import ListLessons from "./ListLessons/list-lessons";
import Transcript from "./Transcript/transcript";
import { TabView} from 'react-native-tab-view';
import TabBarStyle from "../Common/tab-bar-style";
import {ColorsContext} from "../../provider/colors-provider";
import {getCourseAndLessonsDetail, getCourseInfo, getUserCourseDetail} from "../../core/services/course-services";
import {AuthenticationContext} from "../../provider/authentication-provider";
import {checkOwnCourse} from "../../core/services/user-services";
import InfoDialog from "./InfoDialog/info-dialog";
import {DownloadContext} from "../../provider/download-provider";
import {getCoursesDownload, storeCoursesDownload} from "../../core/local_storage/courses-download-storage";
import {extractData} from "./Functions/functions";

const initialLayout = { width: Dimensions.get('window').width };

const CourseDetail = (props) => {
  const {theme} = useContext(ColorsContext)
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

  // useEffect(() => {
  //   console.log('list change')
  //   if(!list) {
  //     console.log('list null')
  //     getCoursesDownload().then(res => {
  //       if(res.status===200) {
  //         if(res.data && res.data.length) {
  //           console.log('number of course download: ', res.data.length)
  //           for(let i=0; i<res.data.length; i++) {
  //             if(res.data[i].id === state.userInfo.id && res.data[i].courses.length) {
  //               for(let j=0; j<res.data[i].courses.length; j++) {
  //                 if(res.data[i].courses[j].id === props.route.params.id) {
  //                   setListAccountAndCourseDownload({data: res.data, userIndex: i, courseIndex: j})
  //                   break
  //                 }
  //                 else if(j===res.data[i].courses.length-1) {
  //                   setListAccountAndCourseDownload({data: res.data, userIndex: i, courseIndex: -1})
  //                 } else {}
  //               }
  //               break
  //             }
  //             else if(i===res.data.length) {
  //               setListAccountAndCourseDownload({data: res.data, userIndex: -1, courseIndex: -1})
  //             } else {}
  //           }
  //         } else {
  //           setListAccountAndCourseDownload({data: [], userIndex: -1, courseIndex: -1})
  //         }
  //       } else {
  //         setListAccountAndCourseDownload(null)
  //         setLoadingError(true)
  //         console.log(res.error)
  //       }
  //     })
  //   } else {
  //     console.log('list not null')
  //     if(props.route.params.id===list.data[list.userIndex].courses[list.courseIndex].id) {
  //       console.log()
  //       setListAccountAndCourseDownload(list)
  //     } else {}
  //   }
  // }, [list])

  useEffect(() => {
    if(!startDownload){
      console.log('startDownload change')
      getCoursesDownload().then(res => {
        if (res.status === 200) {
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
          console.log(res.error)
        }
      })
    }
  }, [startDownload])

  //Lay thong tin khoa hoc
  useEffect(() => {
    //Kiem tra nguoi dung da dang nhap
    if(state.isAuthenticated) {
      //Kiem tra nguoi dung da mua khoa hoc
      checkOwnCourse(state.token, props.route.params.id)
        .then(res => {
          if(res.status === 200) {
            setCheckOwn(res.data.payload.isUserOwnCourse)
            if(res.data.payload.isUserOwnCourse) {
              console.log('own')
              getCourseAndLessonsDetail(props.route.params.id, state.token).then(res => {
                if(res.status===200) {
                  const data = extractData(res.data.payload)
                  setDetail(data)
                  setLesson({videoUrl: data.promoVidUrl || null})
                  setIsLoading(false)
                } else {}
              }).catch(err => {
                alert.log(err.response.data.message || err)
              })
              getUserCourseDetail(props.route.params.id, state.userInfo.id)
                .then(res => {
                  if(res.status===200) {
                    setTempDetail(res.data.payload)
                  } else {}
                }).catch(err => {
                alert(err.response.data.message || err)
              })
            } else {
              console.log('not own')
              getUserCourseDetail(props.route.params.id, state.userInfo.id)
                .then(res => {
                  if(res.status===200) {
                    const data = extractData(res.data.payload)
                    setDetail(data)
                    setLesson({videoUrl: data.promoVidUrl || null})
                    setIsLoading(false)
                  } else {}
                }).catch(err => {
                alert(err.response.data.message || err)
              })
            }
          } else {}
        }).catch(err => {
        alert(err.response.data.message || err)
      })
    } else {
      //Lay thong tin khoa hoc
      console.log('review')
      getCourseInfo(props.route.params.id, state.token).then(res => {
        if(res.status === 200) {
          setDetail(res.data.payload)
          setLesson({videoUrl: res.data.payload.promoVidUrl || null})
          setIsLoading(false)
        } else {
          //res.data.message
        }
      }).catch(err => {
        console.log('getCourse: ', err.response.data.message || err)
      })
    }
  }, [])

  const onPressLesson = (item) => {
    if(item!==lesson ) {
      setLessonLocal(null)
      setLesson(item)
      setVideoLoading(false)
    } else {}
  }

  const onPressDownload = async () => {
    setDownloadData({listAccountAndCourseDownload: listAccountAndCourseDownload, data: [], detail: detail, numberOrder: -1,
      id: props.route.params.id, downloadSection: false})
    setStartDownload(true)
  }

  const onPressDownloadSection = async (data, numberOrder) => {
    setDownloadData({listAccountAndCourseDownload: listAccountAndCourseDownload, data: data, detail: detail, numberOrder: numberOrder,
      id: props.route.params.id, downloadSection: true})
    setStartDownload(true)
  }

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Course' },
    { key: 'second', title: 'Lessons' },
    { key: 'third', title: 'Transcript' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <GeneralCourseDetail
          detail={detail} token={state.token} navigation={props.navigation} route={props.route} checkOwn={checkOwn} downloadId={downloadId}
          courseDownload={
            listAccountAndCourseDownload.courseIndex!==-1 ?
              listAccountAndCourseDownload.data[listAccountAndCourseDownload.userIndex].courses[listAccountAndCourseDownload.courseIndex]
            : null}
          onPressDownload={onPressDownload}
        />;
      case 'second':
        return <ListLessons
          courseDetail={detail} courseId={props.route.params.id} onPressLesson={onPressLesson}
          courseDownload={
          listAccountAndCourseDownload.courseIndex!==-1 ?
            listAccountAndCourseDownload.data[listAccountAndCourseDownload.userIndex].courses[listAccountAndCourseDownload.courseIndex]
          : null}
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
                   setVideoLoading={() => setVideoLoading(true)} navigation={props.navigation} route={props.route}/>
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
