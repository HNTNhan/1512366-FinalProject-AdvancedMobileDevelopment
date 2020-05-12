import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListPathItems from "../../../../Courses/ListPathItems/list-path-items";
import SectionTitle from "../../../../Common/section-title";
import ListAuthorItems from "../../../../Courses/ListAuthorItems/list-author-items";

const AllAuthorResult = (props) => {
  const authors = [
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

  const renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  return <View style={{backgroundColor: 'rgb(240, 239, 245)'}}>
    <FlatList
      data={authors}
      renderItem={({item}) => <ListAuthorItems item={item}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {() => <SectionTitle title={'11 Result'} button={'Filter'}/>}
    />
  </View>
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
    marginLeft: 55,
  },
})

export default AllAuthorResult;
