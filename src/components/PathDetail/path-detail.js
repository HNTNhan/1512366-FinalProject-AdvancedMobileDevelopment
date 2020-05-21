import React from 'react';
import {ScrollView, View} from 'react-native';
import GeneralPathDetail from "./GeneralPathDetail/general-path-detail";
import Progress from "./Progress/progress";
import CourseInPath from "./CoursesInPath/course-in-path";

const PathDetail = (props) => {
  const pathDetail = {
    titlePath: 'React',
    noCourse: '12 courses',
    durationPath: '48 hours',
    description: 'React is a Javascript library, developed in 2013 by Jordan Walke of Facebook. You’ll find React is ' +
      'both very popular (it’s the 5th most starred JS library on GitHub) and used on major sites including on Facebook, ' +
      'Netflix, and Khan Academy. You’ll love the flexibility of using React with your favorite web technologies ' +
      '(except for jQuery!), and this path will take you from the fundamentals all the way up to ' +
      'building full apps with custom styling.',
    progress: 10,
    listCourses: [
      {
        titleCourse: 'Beginner',
        data: [
          {
            title: 'React: The Big Picuture',
            author: 'Cory House',
            level: 'Beginner',
            release: 'May 2020',
            duration: '1h 10m'
          },
          {
            title: 'React: Getting Started',
            author: 'Samer Buna',
            level: 'Beginner',
            release: 'Apr 2020',
            duration: '4h 2m'
          },
          {
            title: 'React Fundamentals',
            author: 'Liam McLennan',
            level: 'Beginner',
            release: 'JUN 2018',
            duration: '4h 13m'
          }
        ]
      },
      {
        titleCourse: 'Intermediate',
        data: [
          {
            title: 'Build Applications with React and Flux',
            author: 'Cory House',
            level: 'Intermediate',
            release: 'Jun 2019',
            duration: '5h 11m'
          },
          {
            title: 'Building Applications with React and Redux',
            author: 'Cory House',
            level: 'Intermediate',
            release: 'Mar 2020',
            duration: '6h 39m'
          }
        ]
      }
    ]
  }

  return <ScrollView style={{flex: 1, marginHorizontal: 5}}>
    <GeneralPathDetail detail={pathDetail}/>
    <Progress progress={pathDetail.progress}/>
    <CourseInPath courses={pathDetail.listCourses}/>
  </ScrollView>
};

export default PathDetail;
