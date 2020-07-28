import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
import {downloadSection} from "./DownloadCourse/download-course";
import {DownloadContext} from "../../provider/download-provider";
import {getCoursesDownload, storeCoursesDownload} from "../../core/local_storage/courses-download-storage";

const initialLayout = { width: Dimensions.get('window').width };

const CourseDetail = (props) => {
  const {theme} = useContext(ColorsContext)
  const {setDownloadInfo, setIsDownloading, downloadInfo} = useContext(DownloadContext)
  const {state} = useContext(AuthenticationContext)
  const [checkOwn, setCheckOwn] = useState(false)
  const [detail, setDetail] = useState({data: null});
  const [tempDetail, setTempDetail] = useState()
  const [lesson, setLesson] = useState(null);
  const [lessonLocal, setLessonLocal] = useState(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [videoLoading, setVideoLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [courseDownload, setCourseDownload] = useState({data: {}, index: -1})
  const [coursesDownload, setCoursesDownload] = useState([])

  useEffect(() => {
    getCoursesDownload().then(res => {
      //console.log(res.data[1])
      if(res.status===200) {
        if(res.data && res.data.length) {
          console.log(res.data.length)
          for(let i=0; i<res.data.length; i++) {
            if(res.data[i].id === props.route.params.id) {
              setCourseDownload({data: res.data[i], index: i})
              setLessonLocal({videoUrl: res.data[i].section[0].data[0].videoUrl || null, local: true})
              setCoursesDownload(res.data)
              break
            } else if(i === res.data.length-1) {
              setCourseDownload(null)
              setCoursesDownload(res.data)
            } else {}
          }
        } else {
          res.data ? console.log('false: ', res.data.length) : null
          setCourseDownload(null)
          setCoursesDownload([])
        }
      } else {
        console.log(res)
      }
    })
  }, [])

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
              getCourseAndLessonsDetail(props.route.params.id, state.token).then(res => {
                if(res.status===200) {
                  console.log('begin')
                  const overview = {
                    numberOrder: 0,
                    name: 'Course Overview',
                    sumHours: 0,
                    data: [
                      {
                        videoUrl: res.data.payload.promoVidUrl || null,
                        numberOrder: 0
                      }
                    ]
                  }

                  for(let i=0; i<res.data.payload.section.length; i++) {
                    res.data.payload.section[i]['data'] = res.data.payload.section[i]['lesson']
                    delete res.data.payload.section[i]['lesson']
                  }
                  res.data.payload.section.unshift(overview)
                  console.log('success')
                  setDetail({data: res.data.payload})
                  setLesson({videoUrl: res.data.payload.promoVidUrl || null})
                  setIsLoading(false)
                } else {

                }
              }).catch(err => {
                console.log(err.response.data.message || err)
              })
              getUserCourseDetail(props.route.params.id, state.userInfo.id)
                .then(res => {
                  if(res.status===200) {
                    setTempDetail(res.data.payload)
                  } else {}
                }).catch(err => {
                console.log(err.response.data.message || err)
              })
            } else {
              getUserCourseDetail(props.route.params.id, state.userInfo.id)
                .then(res => {
                  if(res.status===200) {
                    const overview = {
                      numberOrder: 0,
                      name: 'Course Overview',
                      sumHours: 0,
                      data: [
                        {
                          videoUrl: res.data.payload.promoVidUrl || null,
                          numberOrder: 0
                        }
                      ]
                    }

                    for(let i=0; i<res.data.payload.section.length; i++) {
                      res.data.payload.section[i]['data'] = res.data.payload.section[i]['lesson']
                      delete res.data.payload.section[i]['lesson']
                    }
                    res.data.payload.section.unshift(overview)
                    setDetail({data: res.data.payload})
                    setLesson({videoUrl: res.data.payload.promoVidUrl || null})
                    setIsLoading(false)
                  } else {

                  }
                }).catch(err => {
                console.log(err.response.data.message || err)
              })
            }
          } else {
            //res.data.message
          }
        }).catch(err => {
        console.log('checkOwnCourse: ', err.response.data.message || err)
      })
    } else {
      //Lay thong tin khoa hoc
      getCourseInfo(props.route.params.id, state.token).then(res => {
        if(res.status === 200) {
          setDetail({data: res.data.payload})
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
      console.log(item)
      setLessonLocal(null)
      setLesson(item)
      setVideoLoading(false)
    } else {}
  }

  const onPressDownload = async () => {
    let temp;
    if(courseDownload) {
      temp = {...courseDownload.data}
    } else {
      temp = detail.data
    }
    console.log(temp.section.length)

    for(let i=0; i<temp.section.length; i++) {
      if(temp.section[i].downloaded) {

      } else {
        await onPressDownloadSection(temp.section[i].data, temp.section[i].numberOrder)
      }
    }
  }

  const onPressDownloadSection = async (data, numberOrder) => {
    let tempCourse
    let tempData = [...data]
    if(!courseDownload) {
      console.log('null')
      tempCourse = {...detail.data}
    } else {
      console.log('notnull')
      tempCourse = {...courseDownload.data}
    }

    //console.log(tempCourse)

    if(numberOrder===0) {
      try {
        tempCourse.section[0].data = await downloadSection(tempData,  numberOrder, props.route.params.id, state.token, setDownloadInfo, setIsDownloading)
        tempCourse.section[0].downloaded = true
        console.log('test: ', tempCourse.section[0].downloaded)
      } catch (e) {
        setIsDownloading(false)
      }
    } else {
      try {
        for(let i=0; i<tempCourse.section.length; i++) {
          if(tempCourse.section[i].numberOrder === numberOrder) {
            tempCourse.section[i].data = await downloadSection(tempData, numberOrder, props.route.params.id, state.token, setDownloadInfo, setIsDownloading)
            tempCourse.section[i].downloaded = true
            break;
          } else {}
        }
      } catch (e) {
        setIsDownloading(false)
      }
    }
    //console.log('courseDetail: ', tempCourse)
    //console.log('check')


    if(!courseDownload && !coursesDownload.length) {
      console.log(1)
      await storeCoursesDownload([tempCourse])
      setCourseDownload({data: tempCourse, index: 0})
      setCoursesDownload([tempCourse])
    } else if(!courseDownload && coursesDownload.length) {
      console.log(2)
      let temp = coursesDownload
      temp.push(tempCourse)
      await storeCoursesDownload(temp)
      setCourseDownload({data: tempCourse, index: 0})
      setCoursesDownload(temp)
    } else {
      console.log(3, courseDownload.index)
      let temp = coursesDownload
      temp[courseDownload.index] = tempCourse
      await storeCoursesDownload(temp)
      setCourseDownload({data: tempCourse, index: courseDownload.index})
      setCoursesDownload(temp)
    }
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
        return <GeneralCourseDetail detail={detail.data} token={state.token} navigation={props.navigation} route={props.route} checkOwn={checkOwn}
                                    courseDownload={courseDownload ? courseDownload.data : null} onPressDownload={onPressDownload}/>;
      case 'second':
        return <ListLessons courseDetail={detail.data} courseId={props.route.params.id} onPressLesson={onPressLesson} courseDownload={courseDownload}
                            showInfoDialog={() => setShowInfoDialog(true)} videoLoading={() => setVideoLoading(true)}
                            isAuthenticated={state.isAuthenticated} checkOwn={checkOwn} onPressDownloadSection={onPressDownloadSection}/>;
      case 'third':
        return <Transcript transcript={''} isAuthenticated={state.isAuthenticated} checkOwn={checkOwn}/>;
      default:
        return null;
    }
  };

  if(!isLoading) {
    return <View style={{...styles.container, backgroundColor: theme.background}}>
      <VideoPlayer lesson={lessonLocal || lesson} videoLoading={videoLoading} checkOwn={checkOwn} courseId={detail.data.id} onPressLesson={onPressLesson}
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
