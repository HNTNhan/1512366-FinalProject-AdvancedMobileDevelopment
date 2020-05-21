import React from 'react';
import {FlatList, View} from 'react-native';
import ListAuthorItems from "../ListAuthorItems/list-author-items";
import SectionTitle from "../../Common/section-title";
import {globalStyles} from "../../../Globles/styles";

const ListAuthors = (props) => {
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
      <View style={globalStyles.separator} />
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

export default ListAuthors;
