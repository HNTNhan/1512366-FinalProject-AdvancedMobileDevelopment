import React from 'react';
import {View, FlatList, TextInput, Button, SectionList, Text, StyleSheet} from 'react-native';
import ListCourseItems from "../ListCourseItems/list-course-items";

const ListCourses = (props) => {

  const courses =[
    {
      title: 'Mobile',
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
      title: 'Web',
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
      title: '123',
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
      renderItem={({item}) => <ListCourseItems item={item}/>}
      renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
      ItemSeparatorComponent= {renderSeparator}
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
export default ListCourses;
