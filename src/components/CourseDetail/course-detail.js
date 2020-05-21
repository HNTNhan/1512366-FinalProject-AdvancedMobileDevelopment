import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import VideoPlayer from "./VideoPlayer/video-player";
import GeneralCourseDetail from "./GeneralCourseDetail/general-course-detail";
import ListLessons from "./ListLessons/list-lessons";
import Transcript from "./Transcript/transcript";

const CourseDetail = (props) => {
  const courseDetail= {
      title: 'Developing Mobile Applications Protected by Azure Active Directory',
      description: 'Authenticating users is essential to mobile applications, and for the sake of your users ' +
        'it needed to be implemented right, but it’s difficult to know where to get started. ' +
        'In this course, Developing Mobile Applications Protected by Azure Active Directory, ' +
        'you’ll learn to harness the power and infrastructure of Azure AD to provide your users and mobile apps ' +
        'with a secure sign-in experience. First, you’ll explore how to configure Azure AD to work ' +
        'with your mobile app. Next, you’ll discover how users can sign-in to your mobile application ' +
        'to access secure resources in a custom web API. Finally, you’ll learn how to query the Microsoft Graph ' +
        'to obtain information about your users contained within Azure AD. When you’re finished with this course' +
        ', you’ll have the skills and knowledge of authenticating mobile apps with Azure AD needed ' +
        'to provide your users with a secure experience.',
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

  return <View style={styles.container}>
    <VideoPlayer />
    <ScrollView>
      <GeneralCourseDetail detail={courseDetail}/>
      <View>
        <Transcript />
      </View>
      <View style={styles.lessonContainer}>
        <ListLessons tabLabel='Content' />
      </View>
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lessonContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
})
export default CourseDetail;
