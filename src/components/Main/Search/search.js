import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Text} from 'react-native';
import BeforeSearch from "./BeforeSearch/before-search";

const Search = (props) => {

  return <View style={styles.container}>
    <View style={styles.searchContainer}>
      <TextInput style={styles.searchInput} placeholder='Search' placeholderTextColor='darkgray'/>
      <TouchableOpacity
        onPress={() => { console.log('Search')}}
        title='Search'
        style={styles.cancelButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
    <BeforeSearch/>

  </View>
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  searchInput: {
    paddingHorizontal: 10,
    marginRight: 10,
    flex: 1,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    fontSize: 18,
  },
  cancelButton: {
    width: 60,
    height:40,
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
})

export default Search;
