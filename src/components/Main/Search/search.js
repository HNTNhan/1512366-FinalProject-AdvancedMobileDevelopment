import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BeforeSearch from "./BeforeSearch/before-search";
import WhileSearch from "./WhileSearch/while-search";
import ResultSearch from "./ResultSearch/result_search";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {skillsData} from "../../../testdata/skills-data";
import {categoriesData} from "../../../testdata/categories-data";
import {authorsData} from "../../../testdata/authors-data";
import {AuthenticationContext} from "../../../provider/authentication-provider";

const Search = (props) => {
  const {user, setUser} = useContext(AuthenticationContext);
  const [searchKey, setSearchKey] = useState('');
  const [showResult, setShowResult] = useState(false);
  const {theme} = useContext(ColorsContext);
  const keysHelpSearch = skillsData.map(skill => { return {key: skill.title, type: 'skill'}}).
                         concat(categoriesData.map(category => {return {key: category.title, type: 'category'}})).
                         concat(authorsData.map(author => { return {key: author.detail.name, type: 'author'}}));

  const onPressItem = (value) => {
    if(user.recentSearch.indexOf(value) === -1) {
      let temp = {...user}
      temp.recentSearch.unshift(value)
      setUser(temp)
    } else {}
    setSearchKey(value);
    setShowResult(true);
  }

  const onPressClear = () => {
    let temp = {...user};
    temp.recentSearch = [];
    setUser(temp);
  }

  const onSubmitEditing = () => {
    setShowResult(true)
    if(user.recentSearch.indexOf(searchKey) === -1) {
      let temp = {...user}
      temp.recentSearch.unshift(searchKey)
      setUser(temp)
    } else {}
  }

  return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={{...styles.searchInput, backgroundColor: theme.foreground1, color: theme.text}}
          placeholder='Search'
          placeholderTextColor='darkgray'
          onChangeText={(text) => {
            setSearchKey(text)
            setShowResult(false)
          }}
          value={searchKey}
          returnKeyType={"search"}
          onSubmitEditing={() => onSubmitEditing()}
        />
        { searchKey!=='' ?
          <TouchableOpacity
            onPress={() => {
              setSearchKey('')
              setShowResult(false)
            }}
            title='Cancel'
            style={{...styles.cancelButton}}>
            <Text style={{...styles.buttonText, color: theme.text}}>Cancel</Text>
          </TouchableOpacity>
          : null
        }
    </View>
    {
      showResult===false ? searchKey==='' ?  <BeforeSearch onPress={onPressItem} onPressClear={onPressClear} recentSearch={user.recentSearch} skills={user.skills}/> :
        <WhileSearch searchKey={searchKey} keys={keysHelpSearch} onPress={onPressItem}/>
      : <ResultSearch searchKey={searchKey} route={props.route} navigation={props.navigation}/>
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
