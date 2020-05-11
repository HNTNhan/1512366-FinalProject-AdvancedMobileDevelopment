import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ListKeyItems from "../ListKeyItems/list-key-items";

const WhileSearch = (props) => {
  const keys = [
    {
      id: 1,
      key: 'react'
    },
    {
      id: 2,
       key: "react.js"
    }, {
      id: 3,
      key: 'redux'
    }, {
      id: 4,
      key: 'ruby'
    }, {
      id: 5,
      key: 'networking'
    }, {
      id: 6,
      key: 'node js'
    }, {
      id: 7,
      key: 'node'
    }, {
      id: 8,
      key: 'cloud'
    }, {
      id: 9,
      key: 'c'
    }, {
      id: 10,
      key: 'c#'
    }];
  const filter =  keys.filter(v => v.key.toLowerCase().includes(props.searchKey.toLowerCase()))

  const renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  return <View>
    <FlatList
      data={filter}
      renderItem={({item}) => <ListKeyItems item={item}/>}
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
export default WhileSearch;
