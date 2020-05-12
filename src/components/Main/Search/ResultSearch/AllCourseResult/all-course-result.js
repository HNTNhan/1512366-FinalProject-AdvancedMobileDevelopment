import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListCourseItems from "../../../../Courses/ListCourseItems/list-course-items";
import SectionTitle from "../../../../Common/section-title";

const AllCourseResult = (props) => {
  const courses =[
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
  ]

  const renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  return <View style={{backgroundColor: 'rgb(240, 239, 245)'}}>
    <FlatList
      data={courses}
      renderItem={({item}) => <ListCourseItems item={item}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {() => <SectionTitle title={'42 Result'} button={'Filter'}/>}
    />
  </View>
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
    marginLeft: 105,
  },
})

export default AllCourseResult;
