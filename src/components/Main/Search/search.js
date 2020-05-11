import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Text, Keyboard } from 'react-native';
import BeforeSearch from "./BeforeSearch/before-search";
import WhileSearch from "./WhileSearch/while-search";

const Search = (props) => {
  const [isDisplayCancel, setDisplayCancel] = useState(false);
  let [searchKey, setSearchKey] = useState('');

  return <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search'
          placeholderTextColor='darkgray'
          onChangeText={(text) => setSearchKey(text)}
          value={searchKey}
          returnKeyType={"search"}
          onSubmitEditing={(target) => {
            console.log(target.nativeEvent)
          }}
        />
        { searchKey!=='' ?
          <TouchableOpacity
            onPress={() => {
              setSearchKey('')
              setDisplayCancel(false)
            }}
            title='Cancel'
            style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          : null
        }
    </View>
    {
      searchKey==='' ?  <BeforeSearch /> : <WhileSearch searchKey={searchKey} />
    }


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
    height:30,
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
})

export default Search;
