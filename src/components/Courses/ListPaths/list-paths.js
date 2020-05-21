import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyles} from "../../../Globles/styles";
import SectionTitle from "../../Common/section-title";
import ListPathItems from "../ListPathItems/list-path-items";

const ListPaths = (props) => {
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
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = () => {
    props.navigation.navigate('PathDetail')
  }

  return <View style={{backgroundColor: 'rgb(240, 239, 245)'}}>
    <FlatList
      data={paths}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListPathItems item={item} onPress={onPressItem}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {() => <SectionTitle title={'8 Result'} button={'Filter'}/>}
    />
  </View>
};


export default ListPaths;
