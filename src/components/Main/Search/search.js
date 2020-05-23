import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Text, Keyboard } from 'react-native';
import BeforeSearch from "./BeforeSearch/before-search";
import WhileSearch from "./WhileSearch/while-search";
import ResultSearch from "./ResultSearch/result_search";
import {globalStyles} from "../../../Globles/styles";
import AllResultSearch from "./ResultSearch/AllResultSearch/all-result-search";

const Search = (props) => {
  const [isDisplayCancel, setDisplayCancel] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [showResult, setShowResult] = useState(false)

  const onPress = (value) => {
    console.log(value)
    setSearchKey(value.key);
    setShowResult(true);
  }

  return <View style={globalStyles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search'
          placeholderTextColor='darkgray'
          onChangeText={(text) => {
            setSearchKey(text)
            setShowResult(false)
          }}
          value={searchKey}
          returnKeyType={"search"}
          onSubmitEditing={(target) => {
            setShowResult(true)
          }}
        />
        { searchKey!=='' ?
          <TouchableOpacity
            onPress={() => {
              setSearchKey('')
              setDisplayCancel(false)
              setShowResult(false)
            }}
            title='Cancel'
            style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          : null
        }
    </View>
    {
      showResult===false ? searchKey==='' ?  <BeforeSearch onPress={onPress}/> :
        <WhileSearch searchKey={searchKey} onPress={onPress}/>
      : <ResultSearch navigation={props.navigation} route={props.route}/>
    }


  </View>
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    flex: 1,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    fontSize: 18,
  },
  cancelButton: {
    width: 60,
    height:30,
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
})

export default Search;
