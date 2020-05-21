import React from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";

const Download = (props) => {
  const courses =[
    {
      id: '1',
      title: 'Building Mobile Apps with Visual Studio Tools for Apache Cordova',
      author: 'Matt Honeycutt',
      level: 'Beginner',
      released: 'Jan 17, 2017',
      duration: '3h 41m',
    },
    {
      id: '2',
      title: 'Building Hybrid Mobile Applications with HTML5',
      author: 'Jon Flanders',
      level: 'Intermediate',
      released: 'Mar 9, 2012',
      duration: '4h 25m',
    },
    {
      id: '3',
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

  const renderHeader = () => {
    return <View style={styles.header}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Downloads</Text>
      <TouchableOpacity style={styles.button}
                        onPress={() => { console.log('Remove all')}}>
        <Text style={styles.buttonText}> Remove all </Text>
      </TouchableOpacity>
    </View>
  }

  const onPress = () => {
    props.navigation.navigate('CourseDetail');
  }

  return <View style={{backgroundColor: 'rgb(240, 239, 245)'}}>
    <FlatList
      data={courses}
      renderItem={({item}) => <ListCourseItems item={item} onPress={onPress}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {renderHeader}
    />
  </View>
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginBottom: 5,
  },
  button: {
    padding: 3,
    borderRadius: 10,
    marginRight: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: 'blue',
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
    marginLeft: 105,
  },
})
export default Download;
