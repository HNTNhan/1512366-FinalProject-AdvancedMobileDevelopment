import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import SectionCourseItems from "../SectionCourseItems/section-course-items";
import PathItems from "../PathItems/path-items";

const SectionCourses = (props) => {
  const courses = [
    {
      id: 1,
      title: 'Building Mobile Apps with Visual Studio Tools for Apache Cordova',
      author: 'Matt Honeycutt',
      level: 'Beginner',
      released: 'Jan 17, 2017',
      duration: '3h 41m',
    },
    {
      id: 2,
      title: 'Building Hybrid Mobile Applications with HTML5',
      author: 'Jon Flanders',
      level: 'Intermediate',
      released: 'Mar 9, 2012',
      duration: '4h 25m',
    },
    {
      id: 3,
      title: 'Building Cross-Platform Mobile Apps with Telerik AppBuilder',
      author: 'Steve Michelotti',
      level: 'Intermediate',
      released: 'Jan 18, 2014',
      duration: '3h 15m',
    },
  ];

  const paths = [
    {
      id: 1,
      title: '.NET Base Class Library',
      no_courses: '6 Courses',
      duration: '18 Hours'
    },
    {
      id: 2,
      title: 'Android Development with Kotlin — App Fundamentals',
      no_courses: '5 Courses',
      duration: '17 Hours'
    },
    {
      id: 2,
      title: 'Google: Associate Android Developer (AAD)',
      no_courses: '8 Courses',
      duration: '28 Hours'
    }
  ];

  const renderListItems = (courses) => {
    return courses.map( item => <SectionCourseItems key={item.id} item={item} />);
  }

  const renderPathItems = (paths) => {
    return paths.map( item => <PathItems key={item.id} item={item} />);
  }

  return <View>
    <View>
      <Text>{props.title}</Text>
    </View>
    <ScrollView horizontal={true}>
      {props.title!=='Path' ? renderListItems(courses) : renderPathItems(paths)}
    </ScrollView>
  </View>
};

export default SectionCourses;
