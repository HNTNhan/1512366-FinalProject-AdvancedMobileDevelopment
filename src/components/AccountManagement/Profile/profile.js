import React, {useContext, useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FavoriteCategories from "../../Main/Browse/FavoriteCategories/favoriteCategories";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {ColorsContext} from "../../../provider/colors-provider";
import {getAllCategory} from "../../../core/services/category-service";
import {Button, Icon} from "react-native-elements";
import {convertDate} from "../../Common/convert-data";
import ChooseFavoriteCategoriesModal from "../../Common/choose-favorite-categories-modal";
import {LanguageContext} from "../../../provider/language-provider";

const Profile = (props) => {
  const {theme} = useContext(ColorsContext);
  const {language} = useContext(LanguageContext);
  const authContext = useContext(AuthenticationContext);
  const {state} =useContext(AuthenticationContext);

  const [categories, setCategories] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getAllCategory().then(res => {
      if(res.status === 200) {
        setCategories(res.data.payload)
      } else {}
    }).catch(err => {
      console.log(err.response.data.message || err)
    })
  }, [])

  const onPressClose = (categoriesSelected) => {
    if(categoriesSelected.length) {
      setShowModal(false)
      authContext.updateFavoriteCategories(state.token, categoriesSelected)
    } else {
      setShowModal(false)
    }
  }

  if(state.isAuthenticated) {
    return <View style={{...styles.container, backgroundColor: theme.background}}>
      <View style={styles.containerAccount}>
        {
          state.userInfo.avatar ? <Image source={{uri: state.userInfo.avatar}} style={styles.image}/> :
            <Icon name={'user-circle'} type={"font-awesome-5"} size={50} color={theme.text}/>
        }

        <View>
          <Text style={{...styles.userName, color: theme.text}}>{state.userInfo.name}</Text>
          <Text style={{...styles.text, color: theme.text}}>{state.userInfo.email}</Text>
          <Text style={{...styles.text, color: theme.text}}>{state.userInfo.phone}</Text>
        </View>
      </View>

      {
        categories ? <View style={{...styles.subContainer}}>
          <View style={{...styles.favoriteTitleCategoriesContainer}}>
            <Text style={{...styles.title, color: theme.text}}>{language.profile.favoriteCategories}</Text>
            <Button
              buttonStyle={styles.changeButton}
              titleStyle={{...styles.changeButtonText, color: theme.text}}
              onPress={() => setShowModal(true)}
              title={language.profile.change}/>
          </View>

          <FavoriteCategories allCategories={categories} favoriteCategories={state.userInfo.favoriteCategories}
                              navigation={props.navigation} route={props.route} language={language}/>
          {
            !state.userInfo.favoriteCategories.length ?
              <Button
                buttonStyle={styles.button}
                titleStyle={{...styles.buttonText}}
                onPress={() => setShowModal(true)}
                title={language.profile.buttonChooseFavorite}/> : null

          }
          <ChooseFavoriteCategoriesModal showModal={showModal} categories={categories} onPressClose={onPressClose} language={language}/>
        </View>: null
      }


      <View style={styles.subContainer}>
        <Text style={{...styles.title, color: theme.text}}>{language.profile.user}</Text>
        <View>
          <Text style={{...styles.text, color: theme.text}}>{language.profile.type}{state.userInfo.type}</Text>
          <Text style={{...styles.text, color: theme.text}}>{language.profile.point}{state.userInfo.point}</Text>
          <Text style={{...styles.text, color: theme.text}}>{language.profile.createAt}{convertDate(state.userInfo.createdAt, null, language.same.lang)}</Text>
          <Text style={{...styles.text, color: theme.text}}>{language.profile.lastUpdate}{convertDate(state.userInfo.updatedAt, null, language.same.lang)}</Text>
        </View>
      </View>
    </View>
  } else {
    return <View style={{...styles.containerSignIn, backgroundColor: theme.background}}>
      <Text style={{...styles.text, color: theme.text}}>{language.profile.alertSignIn}</Text>
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => props.navigation.replace('Authentication')}
        title={language.profile.signIn}/>
    </View>
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  containerSignIn: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  subContainer: {
    marginVertical: 10,
  },
  favoriteTitleCategoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  text: {
    fontSize: 16
  },
  button: {
    marginVertical: 10,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#19B5FE',
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  changeButton: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  changeButtonText: {
    fontSize: 16,
  }
})
export default Profile;
