import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import ListCourseItems from "../../../../Courses/ListCourseItems/list-course-items";
import {globalStyles} from "../../../../../globles/styles";

const CourseResult = (props) => {
  const onPressItem = (id) => {
    props.navigation.navigate('CourseDetail', {id: id})
  }

  return <FlatList
    showsVerticalScrollIndicator={false}
    data={props.courses}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => <ListCourseItems item={item} onPress={() => onPressItem(item.id)}/>}
    ItemSeparatorComponent= {() => <View style={globalStyles.separator} />}
    onEndReached={() => props.reachEnd ? null : props.handleLoadMore()}
    onEndReachedThreshold={0.00001}
    ListFooterComponent={() => {
      if(!props.isLoadMore) return null
      return <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}>
        <ActivityIndicator size={"large"} color={'blue'}/>
      </View>
    }}
  />
};

export default CourseResult;
