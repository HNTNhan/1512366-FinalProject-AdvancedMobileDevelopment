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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TabBarStyle from "../Common/tab-bar-style";
import {ColorsContext} from "../../provider/colors-provider";
import {getCourseAndLessonsDetail, getCourseInfo, getUserCourseDetail} from "../../core/services/course-services";
import {AuthenticationContext} from "../../provider/authentication-provider";
import {checkOwnCourse} from "../../core/services/user-services";
import InfoDialog from "./InfoDialog/info-dialog";
import ListLessonItems from "./ListLessonItems/list-lesson-items";

const initialLayout = { width: Dimensions.get('window').width };

const CourseDetail = (props) => {
  const {theme} = useContext(ColorsContext)
  const {state} = useContext(AuthenticationContext)
  const [checkOwn, setCheckOwn] = useState(false)
  const [detail, setDetail] = useState({data: null});
  const [tempDetail, setTempDetail] = useState()
  const [lesson, setLesson] = useState(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [videoLoading, setVideoLoading] = useState(false)
  //console.log(props.route.params.id)
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
                  setDetail({data: res.data.payload})
                  setLesson({videoUrl: res.data.payload.promoVidUrl || null})
                  setIsLoading(false)
                } else {

                }
              }).catch(err => {
                console.log(err.response.data.message)
              })
              getUserCourseDetail(props.route.params.id, state.userInfo.id)
                .then(res => {
                  if(res.status===200) {
                    setTempDetail(res.data.payload)
                  } else {}
                }).catch(err => {
                console.log(err.response.data.message)
              })
            } else {
              console.log(res.data.payload.isUserOwnCourse)
              getUserCourseDetail(props.route.params.id, state.userInfo.id)
                .then(res => {
                  if(res.status===200) {
                    setDetail({data: res.data.payload})
                    setLesson({videoUrl: res.data.payload.promoVidUrl || null})
                    setIsLoading(false)
                  } else {

                  }
                }).catch(err => {
                console.log(err.response.data.message)
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
    if(item!==lesson) {
      console.log(item)
      setLesson(item)
      setVideoLoading(false)
    } else {}
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
        return <GeneralCourseDetail detail={detail.data} navigation={props.navigation} route={props.route}/>;
      case 'second':
        return <ListLessons courseDetail={detail.data} courseId={props.route.params.id} onPressLesson={onPressLesson} showInfoDialog={() => setShowInfoDialog(true)}
                            videoLoading={() => setVideoLoading(true)} isAuthenticated={state.isAuthenticated} checkOwn={checkOwn}/>;
      case 'third':
        return <Transcript transcript={''} isAuthenticated={state.isAuthenticated} checkOwn={checkOwn}/>;
      default:
        return null;
    }
  };

  if(!isLoading) {
    return <View style={{...styles.container, backgroundColor: theme.background}}>
      <VideoPlayer lesson={lesson} videoLoading={videoLoading} checkOwn={checkOwn} courseId={detail.data.id} onPressLesson={onPressLesson}
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
