import React from 'react';
import {ScrollView, View} from 'react-native';
import GeneralAuthorDetail from "./GeneralAuthorDetail/general-author-detail";
import {globalStyles} from "../../Globles/styles";
import ItemsInAuthor from "./ItemsInAuthor/items-in-author";

const AuthorDetail = (props) => {
  const authorDetail= {
    detail: {
      name: 'Deborah Kurata',
      work: 'Pluralsight Author',
      info: 'Deborah Kurata is a software developer, consultant, conference speaker, and Pluralsight author. ' +
        'Her courses include: Angular: Getting Started, Angular Routing, and Object-Oriented Programming Fundamentals ' +
        'in C#. For her work in support of software developers, she has been recognized with ' +
        'the Microsoft Most Valuable Professional (MVP) award, and is a Google Developer Expert (GDE).',
      facebook: 'https://www.facebook.com/deborah.kurata',
      twitter: 'http://twitter.com/@DeborahKurata',
      other: 'http://msmvps.com/blogs/deborahk',
    },
    courses: [
      {
        id: 1,
        title: 'Angular: Getting Started',
        author: 'Deborah Kurata',
        level: 'Beginner',
        release: 'Apr 2020',
        duration: '5h 53m'
      },
      {
        id: 2,
        title: 'Defensive Coding in C#',
        author: 'Deborah Kurata',
        level: 'Beginner',
        release: 'Jan 2020',
        duration: '2h 14m'
      },
      {
        id: 3,
        title: 'Angular Reactive Forms',
        author: 'Deborah Kurata',
        level: 'Intermediate',
        release: 'Sep 2019',
        duration: '3h 52m'
      }
    ]
  }
  return <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
    <GeneralAuthorDetail detail={authorDetail.detail}/>
    <ItemsInAuthor items={authorDetail.courses} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default AuthorDetail;
