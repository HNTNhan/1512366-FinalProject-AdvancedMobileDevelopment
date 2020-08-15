import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {globalStyles} from "../../../../../globles/styles";
import ListAuthorItems from "../../../../Courses/ListAuthorItems/list-author-items";

const AuthorResult = (props) => {
  const onPressItem = (id, name) => {
    props.navigation.navigate('AuthorDetail', {key: id, title: name})
  }

  return <FlatList
    showsVerticalScrollIndicator={false}
    data={props.authors}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => <ListAuthorItems item={item} onPress={() => onPressItem(item.id, item.name)} language={props.language}/>}
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

export default AuthorResult;
