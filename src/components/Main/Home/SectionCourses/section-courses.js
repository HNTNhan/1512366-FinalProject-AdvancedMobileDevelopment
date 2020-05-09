import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import SectionCourseItems from "../SectionCourseItems/section-course-items";

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
  
  const renderListItems = (courses) => {
    return courses.map( item => <SectionCourseItems key={item.id} item={item} />);
  }
  
  return <View>
    <View>
      <Text>{props.title}</Text>
    </View>
    <ScrollView horizontal={true}>
      {renderListItems(courses)}
    </ScrollView>
  </View>
};

export default SectionCourses;
