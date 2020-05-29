import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import VideoPlayer from "./VideoPlayer/video-player";
import GeneralCourseDetail from "./GeneralCourseDetail/general-course-detail";
import ListLessons from "./ListLessons/list-lessons";
import Transcript from "./Transcript/transcript";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AllResultSearch from "../Main/Search/ResultSearch/AllResultSearch/all-result-search";
import AllCourseResult from "../Main/Search/ResultSearch/AllCourseResult/all-course-result";
import AllPathResult from "../Main/Search/ResultSearch/AllPathResult/all-path-result";
import AllAuthorResult from "../Main/Search/ResultSearch/AllAuthorResult/all-author-result";
import TabBarStyle from "../Common/tab-bar-style";

const initialLayout = { width: Dimensions.get('window').width };

const CourseDetail = (props) => {
  const courseDetail= {
      title: 'Developing Mobile Applications Protected by Azure Active Directory',
      description: 'Authenticating usersData is essential to mobile applications, and for the sake of your usersData ' +
        'it needed to be implemented right, but it’s difficult to know where to get started. ' +
        'In this course, Developing Mobile Applications Protected by Azure Active Directory, ' +
        'you’ll learn to harness the power and infrastructure of Azure AD to provide your usersData and mobile apps ' +
        'with a secure sign-in experience. First, you’ll explore how to configure Azure AD to work ' +
        'with your mobile app. Next, you’ll discover how usersData can sign-in to your mobile application ' +
        'to access secure resources in a custom web API. Finally, you’ll learn how to query the Microsoft Graph ' +
        'to obtain information about your usersData contained within Azure AD. When you’re finished with this course' +
        ', you’ll have the skills and knowledge of authenticating mobile apps with Azure AD needed ' +
        'to provide your usersData with a secure experience.',
      author: [
        {
          icon: require('../../../assets/ic_person.png'),
          name: 'Matthew Soucoup'
        },
        {
          icon: require('../../../assets/ic_person.png'),
          name: 'Jonathan Lovatt',
        },
        {
          icon: require('../../../assets/ic_person.png'),
          name: 'Jonathan Lovatt',
        }
      ],
      level: 'Intermediate',
      released: 'May 11, 2020',
      duration: '1h 18m',
    };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Course' },
    { key: 'second', title: 'Transcript' },
    { key: 'third', title: 'Lessons' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <GeneralCourseDetail  detail={courseDetail} navigation={props.navigation} route={props.route}/>;
      case 'second':
        return <Transcript />;
      case 'third':
        return <ListLessons tabLabel='Content'/>;
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
      sceneContainerStyle={{paddingHorizontal: 5, backgroundColor: 'white'}}
    />
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default CourseDetail;
