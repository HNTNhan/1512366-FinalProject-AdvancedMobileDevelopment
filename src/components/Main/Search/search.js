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
import {getRecentSearch, storeRecentSearch} from "../../../core/local_storage/search-storage";

const Search = (props) => {
  const {theme} = useContext(ColorsContext);
  const {state} = useContext(AuthenticationContext);
  const [searchKey, setSearchKey] = useState('');
  const [recentSearch, setRecentSearch] = useState([])
  const [categorySelect, setCategorySelect] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [favoriteCategories, setFavoriteCategories] = useState(null)
  const [isLoading, setIsLoading] = useState(state.isAuthenticated)

  useEffect(() => {
    getRecentSearch().then(res => {
      if(res.status===200) {
        if(res.data) {
          setRecentSearch(res.data)
        } else {
          setRecentSearch([])
        }
      } else {
        setRecentSearch([])
      }
    })
  }, [])

  if(state.isAuthenticated) {
    useEffect(() => {
      getAllCategory().then(res => {
        if(res.status === 200) {
          let favoriteCategories = [];
          for(let i=0 ; i<res.data.payload.length; i++) {
            for(let j=0; j<state.userInfo.favoriteCategories.length; j++) {
              if(res.data.payload[i].id===state.userInfo.favoriteCategories[j]) {
                favoriteCategories.push(res.data.payload[i])
              } else {}
            }
          }
          setFavoriteCategories(favoriteCategories)
          setIsLoading(false)
        } else {}
      }).catch(err => {
        console.log(err.response.data.message || err)
      })
    }, [state.userInfo.favoriteCategories])
  }


  const onPressItem = (category) => {
    setCategorySelect([category.id]);
    setSearchKey('');
    setShowResult(true);
  }

  const onPressClear = () => {
    // let temp = {...user};
    // temp.recentSearch = [];
    // setUser(temp);
  }

  const checkRecentSearch = (value) => {
    for (let i = 0; i < recentSearch.length; i++) {
      if (recentSearch[i] === value) {
        return true
      }
    }
    return false
  }

  const onSubmitEditing = async () => {
    if(!checkRecentSearch(searchKey)) {
      let temp = [...recentSearch]
      temp.unshift(searchKey)
      if(recentSearch.length > 5) {
        setRecentSearch(temp.slice(0, 5))
        await storeRecentSearch(temp.slice(0, 5))
      } else {
        setRecentSearch(temp)
        await storeRecentSearch(temp)
      }
    }
    setShowResult(true)
  }

  const getCategoriesSelected = (categories) => {
    setCategorySelect(categories)
  }

  if(!isLoading) {
    return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={{...styles.searchInput, backgroundColor: theme.foreground1, color: theme.text}}
          placeholder='Search'
          placeholderTextColor='darkgray'
          onChangeText={(text) => {
            setSearchKey(text)
            //setCategorySelect([])
            setShowResult(false)
          }}
          value={searchKey}
          returnKeyType={"search"}
          onSubmitEditing={() => onSubmitEditing()}
        />

        { searchKey!==''||showResult ?
          <TouchableOpacity
            onPress={() => {
              setSearchKey('')
              setCategorySelect([])
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
        showResult===false ? searchKey==='' ? state.isAuthenticated && favoriteCategories ?
          <BeforeSearch onPress={onPressItem} onPressClear={onPressClear} recentSearch={recentSearch} favoriteCategories={favoriteCategories}/>
              : null
            : null /*<WhileSearch searchKey={searchKey} keys={keysHelpSearch} onPress={onPressItem}/>*/
          : <ResultSearch searchKey={searchKey} categorySelect={categorySelect} getCategoriesSelected={getCategoriesSelected} route={props.route} navigation={props.navigation}/>
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
