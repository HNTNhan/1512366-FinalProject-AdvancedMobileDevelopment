import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BeforeSearch from "./BeforeSearch/before-search";
import ResultSearch from "./ResultSearch/result_search";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {getAllCategory} from "../../../core/services/category-service";
import CenterActivityIndicator from "../../Common/center-activity-indicator";
import {LanguageContext} from "../../../provider/language-provider";
import {deleteSearchHistory, getSearchHistory} from "../../../core/services/course-services";

const Search = (props) => {
  const {theme} = useContext(ColorsContext);
  const {language} = useContext(LanguageContext);
  const {state} = useContext(AuthenticationContext);
  const [searchKey, setSearchKey] = useState('');
  const [recentSearch, setRecentSearch] = useState([])
  const [categorySelect, setCategorySelect] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [favoriteCategories, setFavoriteCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    if(state.isAuthenticated) {
      console.log(123)
      getAllCategory().then(res => {
        if (res.status === 200) {
          let favoriteCategories = [];
          for (let i = 0; i < res.data.payload.length; i++) {
            for (let j = 0; j < state.userInfo.favoriteCategories.length; j++) {
              if (res.data.payload[i].id === state.userInfo.favoriteCategories[j]) {
                favoriteCategories.push({...res.data.payload[i]})
              } else {
              }
            }
          }
          setFavoriteCategories(favoriteCategories)
          setIsLoading(false)
        } else {
        }
      }).catch(err => {
        setIsLoading(false)
        alert(err.response.data.message || err)
      })
    } else {}
  }, [state.userInfo])

  useEffect(() => {
    if(state.isAuthenticated) {
      getSearchHistory(state.token).then(res => {
        if(res.status === 200) {
          setRecentSearch(res.data.payload.data)
        } else {}
      }).catch(err => {
        alert(err.response.data.message || err)
      })
    }
  }, [showResult])


  const onPressItem = (item, type) => {
    if(type===0) {
      setSearchKey(item.content);
      setShowResult(true);
    } else {
      setCategorySelect([item.id]);
      setSearchKey('');
      setShowResult(true);
    }
  }

  const deleteAllRecentSearch = async () => {
    for(let i=recentSearch.length-1; i>=0; i--) {
      deleteSearchHistory(recentSearch[i].id, state.token).then().catch(err => {
        alert(err.response.data.message || err)
      })
    }
  }

  const onPressClear = async () => {
    await deleteAllRecentSearch()
    setRecentSearch([])
  }

  const onSubmitEditing = async () => {
    setShowResult(true)
  }

  const getCategoriesSelected = (categories) => {
    setCategorySelect(categories)
  }

  if(isLoading && state.isAuthenticated) {
    return <CenterActivityIndicator />
  } else {
    return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={{...styles.searchInput, backgroundColor: theme.foreground1, color: theme.text}}
          placeholder={language.search.placeholder}
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
            style={{...styles.cancelButton}}>
            <Text style={{...styles.buttonText, color: theme.text}}>{language.same.buttonCancel}</Text>
          </TouchableOpacity>
          : null
        }
      </View>

      {
        showResult===false ?state.isAuthenticated && favoriteCategories ?
          <BeforeSearch onPress={onPressItem} onPressClear={onPressClear} recentSearch={recentSearch} language={language}
                        favoriteCategories={favoriteCategories} /> : null :
          <ResultSearch searchKey={searchKey} categorySelect={categorySelect} getCategoriesSelected={getCategoriesSelected} language={language}
                          route={props.route} navigation={props.navigation}/>
      }
    </View>
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
