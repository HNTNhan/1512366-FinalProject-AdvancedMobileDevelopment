import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListCourseItems from "../../../../Courses/ListCourseItems/list-course-items";
import SectionTitle from "../../../../Common/section-title";
import ListPathItems from "../../../../Courses/ListPathItems/list-path-items";

const AllPathResult = (props) => {
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
      id: 3,
      title: 'Google: Associate Android Developer (AAD)',
      no_courses: '8 Courses',
      duration: '28 Hours'
    },
  ]

  const renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  return <View style={{backgroundColor: 'rgb(240, 239, 245)'}}>
    <FlatList
      data={paths}
      renderItem={({item}) => <ListPathItems item={item}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {() => <SectionTitle title={'8 Result'} button={'Filter'}/>}
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

export default AllPathResult;
