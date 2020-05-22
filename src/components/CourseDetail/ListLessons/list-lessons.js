import React, {useState} from 'react';
import {ScrollView, SectionList, StyleSheet, View} from 'react-native';
import ListLessonItems from "../ListLessonItems/list-lesson-items";
import ListLessonTitle from "../ListLessonTitle/list-lesson-title";
import {globalStyles} from "../../../Globles/styles";

const ListLessons = (props) => {
  const courseLessons = [
    {
      id: 1,
      title: 'Course Overview',
      totalDuration: '1:01',
      data: [
        {
          key: 'Course Overview',
          name: 'Course Overview',
          duration: '1:01',
        }
      ]
    },
    {
      id: 2,
      title: 'Understanding Azure Active Directory Mobile Applications',
      totalDuration: '13:34',
      data: [
        {
          key: 'Course Introduction',
          name: 'Course Introduction',
          duration: '3:35',
        },
        {
          key: 'Mobile Authentication Flow',
          name: 'Mobile Authentication Flow',
          duration: '3:13',
        },
        {
          key: 'Mobile Azure AD Concepts',
          name: 'Mobile Azure AD Concepts',
          duration: '3:42',
        },
        {
          key: 'Creating a Mobile Azure AD Application',
          name: 'Creating a Mobile Azure AD Application',
          duration: '3:02',
        },
      ]
    },
    {
      id: 3,
      title: 'Authenticating with Mobile Apps',
      totalDuration: '19:50',
      data: [
        {
          key: 'Mobile App Authentication Basics',
          name: 'Mobile App Authentication Basics',
          duration: '2:44',
        },
        {
          key: 'Setting up for Authentication',
          name: 'Setting up for Authentication',
          duration: '7:25',
        },
        {
          key: 'Retrieving Secured Data',
          name: 'Retrieving Secured Data',
          duration: '8:37',
        },
        {
          key: 'Summary',
          name: 'Summary',
          duration: '1:03',
        },
      ]
    },
  ]

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  return <SectionList
    sections={courseLessons}
    keyExtractor={(item, index) => item + index}
    renderItem={({item, index}) =>
      <ListLessonItems item={item}/>
    }
    renderSectionHeader={({section: {title, totalDuration, id}}) => <ListLessonTitle index={id} title={title} totalDuration={totalDuration}/>}
    SectionSeparatorComponent={renderSeparator}
  />
};

export default ListLessons;
