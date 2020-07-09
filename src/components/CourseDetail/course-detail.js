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

const initialLayout = { width: Dimensions.get('window').width };

const CourseDetail = (props) => {
  const {theme} = useContext(ColorsContext)
  const {state} = useContext(AuthenticationContext)
  const [checkOwn, setCheckOwn] = useState(false)
  const [detail, setDetail] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false)

  //Lay thong tin khoa hoc
  useEffect(() => {
    if(!detail) {
      let mounted1 = true;
      let mounted2 = true;
      //Kiem tra nguoi dung da mua khoa hoc
      checkOwnCourse(state.token, props.route.params.id)
        .then(res => {
          if(res.status === 200) {
            if(mounted1) {
              setCheckOwn(res.data.payload.isUserOwnCourse)
            } else {}
          } else {
            //res.data.message
          }
        }).catch(err => {
        console.log('check own course detail error')
        console.log(err.response.data.message || err)
      })

      //Nguoi dung chua mua khoa hoc
      getUserCourseDetail(props.route.params.id, state.userInfo.id)
        .then(res => {
          if(res.status === 200) {
            if(mounted2) {
              setDetail(res.data.payload)
              setLesson(res.data.payload.section[0].lesson[0])
            }
          } else {
            //res.data.message
          }
        }).catch(err => {
          console.log('get course detail error')
          console.log(err.response.data.message || err)
      })

      // Nguoi dung da mua khoa hoc
      // getCourseAndLessonsDetail(props.route.params.id, state.token)
      //   .then((res) => {
      //     setCourseDetail(res)
      //   })

      return () => {
        mounted1 = false
        mounted2 = false
      }
    } else {}
  }, [])

  const onPressLesson = (item) => {
    if(item!==lesson) {
      if(!checkOwn && !item.promoVidUrl) {
        if (item.isPreview) {
          setLesson(item)
        } else {
          setShowInfoDialog(true)
        }
      } else {
        setLesson(item)
      }
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
         return <GeneralCourseDetail detail={detail} navigation={props.navigation} route={props.route}/>;
      case 'second':
        return <ListLessons courseDetail={detail} onPressLesson={onPressLesson}/>;
      case 'third':
        return <Transcript transcript={''}/>;
      default:
        return null;
    }
  };

  if(detail) {
    return <View style={{...styles.container, backgroundColor: theme.background}}>
      <VideoPlayer lesson={lesson}/>
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
