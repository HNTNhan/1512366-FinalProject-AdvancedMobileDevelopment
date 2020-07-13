import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BeforeSearch from "./BeforeSearch/before-search";
import WhileSearch from "./WhileSearch/while-search";
import ResultSearch from "./ResultSearch/result_search";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {getAllCategory} from "../../../core/services/category-service";
import CenterActivityIndicator from "../../Common/center-activity-indicator";

const Search = (props) => {
  const {theme} = useContext(ColorsContext);
  const {user, setUser, state} = useContext(AuthenticationContext);
  const [searchKey, setSearchKey] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [favoriteCategories, setFavoriteCategories] = useState(null)

  useEffect(() => {
    getAllCategory().then(res => {
      if(res.status === 200) {
        let favoriteCategories = [];
        for(let i=0 ; i<state.userInfo.favoriteCategories.length; i++) {
          favoriteCategories.push(res.data.payload.find((categoryId) => categoryId===state.userInfo.favoriteCategories[i].id))
        }
        setFavoriteCategories(favoriteCategories)
      } else {}
    }).catch(err => {
      console.log(err.response.data.message || err)
    })
  }, [])

  const onPressItem = (value) => {
    // if(user.recentSearch.indexOf(value) === -1) {
    //   let temp = {...user}
    //   temp.recentSearch.unshift(value)
    //   setUser(temp)
    // } else {}
    // setSearchKey(value);
    // setShowResult(true);
  }

  const onPressClear = () => {
    // let temp = {...user};
    // temp.recentSearch = [];
    // setUser(temp);
  }

  const onSubmitEditing = () => {
    setShowResult(true)
  }

  if(favoriteCategories) {
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
        showResult===false ? searchKey==='' ?  <BeforeSearch onPress={onPressItem} onPressClear={onPressClear} recentSearch={[]} favoriteCategories={favoriteCategories}/>
        : null /*<WhileSearch searchKey={searchKey} keys={keysHelpSearch} onPress={onPressItem}/>*/
          : <ResultSearch searchKey={searchKey} route={props.route} navigation={props.navigation}/>
      }
    </View>
  } else {
     return <CenterActivityIndicator />
  }

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
