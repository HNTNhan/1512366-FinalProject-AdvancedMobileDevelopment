import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
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

const initialLayout = { width: Dimensions.get('window').width };

const CourseDetail = (props) => {
  const course = findByKey(coursesData, [props.route.params.key])[0]
  const authors = findAuthorByName(authorsData, course.author)
  const {theme} = useContext(ColorsContext)

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Course' },
    { key: 'second', title: 'Transcript' },
    { key: 'third', title: 'Lessons' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <GeneralCourseDetail  detail={course} author={authors} navigation={props.navigation} route={props.route}/>;
      case 'second':
        return <Transcript transcript={course.transcript}/>;
      case 'third':
        return <ListLessons tabLabel='Content' lessons={course.lessons}/>;
      default:
        return null;
    }
  };

  return <View style={styles.container}>
    <VideoPlayer />
    <TabView
      renderTabBar={TabBarStyle}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      sceneContainerStyle={{paddingHorizontal: 5, backgroundColor: theme.background}}
    />
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default CourseDetail;
