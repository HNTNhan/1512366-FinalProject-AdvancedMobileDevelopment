import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import VideoPlayer from "./VideoPlayer/video-player";
import GeneralCourseDetail from "./GeneralCourseDetail/general-course-detail";
import ListLessons from "./ListLessons/list-lessons";
import Transcript from "./Transcript/transcript";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TabBarStyle from "../Common/tab-bar-style";
import {findAuthorByName, findByKey} from "../../testdata/find-data";
import {coursesData} from "../../testdata/courses-data";
import {authorsData} from "../../testdata/authors-data";
import {ColorsContext} from "../../provider/colors-provider";
import {getCourseAndLessonsDetail, getCourseInfo, getUserCourseDetail} from "../../core/services/course-services";
import {AuthenticationContext} from "../../provider/authentication-provider";
import {getInstructorInfo} from "../../core/services/instructor-services";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const initialLayout = { width: Dimensions.get('window').width };

const CourseDetail = (props) => {
  const {theme} = useContext(ColorsContext)
  const {user1} = useContext(AuthenticationContext)
  const [detail, setDetail] = useState(null);

  //Lay thong tin khoa hoc
  useEffect(() => {
    if(!detail) {
      //Nguoi dung chua dang nhap
      // getCourseAndLessonsDetail(props.route.params.id, user1.token)
      //   .then((res) => {
      //     setCourseDetail(res)
      //   })

      //Nguoi dung da dang nhap
      getUserCourseDetail(props.route.params.id, user1.userInfo.id)
        .then((res) => {
          let courseDetail = res
          getInstructorInfo(res.instructorId)
            .then((res) => {
              let detail = {
                courseDetail: courseDetail,
                instructorInfo: res
              }
              setDetail(detail)
            })

        })
    } else {

    }
  }, [])

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Course' },
    { key: 'second', title: 'Transcript' },
    { key: 'third', title: 'Lessons' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
         return <GeneralCourseDetail detail={detail} navigation={props.navigation} route={props.route}/>;
      case 'second':
        return <Transcript transcript={''}/>;
      case 'third':
        return <ListLessons tabLabel='Content' courseDetail={detail.courseDetail}/>;
      default:
        return null;
    }
  };

  if(detail) {
    return <View style={{...styles.container, backgroundColor: theme.background}}>
      <VideoPlayer/>
      <TabView
        renderTabBar={TabBarStyle}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        sceneContainerStyle={{paddingHorizontal: 5, backgroundColor: theme.background}}
      />
    </View>
  } else {
    return null
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    paddingHorizontal: 5,
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 18,
  }
})
export default CourseDetail;
