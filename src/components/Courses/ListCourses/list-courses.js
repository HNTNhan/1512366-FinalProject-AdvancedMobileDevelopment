import React from 'react';
import {View, FlatList, TextInput, Button, SectionList, Text, StyleSheet} from 'react-native';
import ListCourseItems from "../ListCourseItems/list-course-items";
import ListPathItems from "../ListPathItems/list-path-items";
import ListAuthorItems from "../ListAuthorItems/list-author-items";
import SectionTitle from "../../Common/section-title";

const ListCourses = (props) => {
  const courses =[
    {
      title: 'Courses',
      num: '42 results',
      data: [
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
    },
    {
      title: 'Paths',
      num: '8 results',
      data: [
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
          id: 3,
          title: 'Google: Associate Android Developer (AAD)',
          no_courses: '8 Courses',
          duration: '28 Hours'
        },
      ]
    },
    {
      title: 'Authors',
      num: '11 results',
      data: [
        {
          id: 1,
          author: 'Matt Honeycutt',
          no_courses: '5 course',
        },
        {
          id: 2,
          author: 'Jon Flanders',
          no_courses: '10 course',
        },
        {
          id: 3,
          author: 'Steve Michelotti',
          no_courses: '8 course',
        },
      ]
    },
  ]

  const renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  // const searchView = () => {
  //   return <View style={{flexDirection: 'row', margin: 5}}>
  //     <TextInput style={{flex: 1, borderWidth: 1, borderColor: 'gray'}} placeholder='Search text'/>
  //     <Button onPress={() => { console.log('Search')}}
  //             title='Search'
  //             style={{width: 60, height:40, backgroundColor: 'white'}}/>
  //   </View>
  // }

  return <View>
    {/*<FlatList*/}
    {/*  data={courses}*/}
    {/*  renderItem={({item}) => <ListCourseItems item={item}/>}*/}
    {/*  ListHeaderComponent={() => searchView()}*/}
    {/*/>*/}

    <SectionList
      sections={courses}
      renderItem={({item}) =>
        Object.keys(item).length===6 ? <ListCourseItems item={item}/>
                : Object.keys(item).length==4 ? <ListPathItems item={item}/> : <ListAuthorItems item={item}/>
      }
      renderSectionHeader={({section: {title, num}}) => <SectionTitle title={title} button={num}/>}
      ItemSeparatorComponent= {renderSeparator}
    />
  </View>
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
  },
})
export default ListCourses;
