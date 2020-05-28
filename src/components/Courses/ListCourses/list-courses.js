import React from 'react';
import {View, FlatList} from 'react-native';
import ListCourseItems from "../ListCourseItems/list-course-items";
import ListPathItems from "../ListPathItems/list-path-items";
import ListAuthorItems from "../ListAuthorItems/list-author-items";
import SectionTitle from "../../Common/section-title";
import {globalStyles} from "../../../globles/styles";

const ListCourses = (props) => {
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
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = () => {
    props.navigation.navigate('CourseDetail')
  }

  return <View>
    <FlatList
      data={courses}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListCourseItems item={item} onPress={onPressItem}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {() => <SectionTitle title={'42 Result'} button={'Filter'}/>}
    />
  </View>
};

export default ListCourses;
