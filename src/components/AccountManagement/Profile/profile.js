import React, {useContext, useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FavoriteCategories from "../../Main/Browse/FavoriteCategories/favoriteCategories";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {ColorsContext} from "../../../provider/colors-provider";
import {getAllCategory} from "../../../core/services/category-service";
import {Button, Icon} from "react-native-elements";
import {convertDate} from "../../Common/convert-data";
import ChooseFavoriteCategoriesModal from "../../Common/choose-favorite-categories-modal";

const Profile = (props) => {
  const {theme} = useContext(ColorsContext);
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
            <Text style={{...styles.title, color: theme.text}}>Favorite Categories</Text>
            <Button
              buttonStyle={styles.changeButton}
              titleStyle={{...styles.changeButtonText, color: theme.text}}
              onPress={() => setShowModal(true)}
              title = 'Change'/>
          </View>

          <FavoriteCategories title={'Favorite Categories'} allCategories={categories} favoriteCategories={state.userInfo.favoriteCategories}
                              navigation={props.navigation} route={props.route}/>
          {
            !state.userInfo.favoriteCategories.length ?
              <Button
                buttonStyle={styles.button}
                titleStyle={{...styles.buttonText}}
                onPress={() => setShowModal(true)}
                title = 'Choose your favorite categories'/> : null

          }
          <ChooseFavoriteCategoriesModal showModal={showModal} categories={categories} onPressClose={onPressClose}/>
        </View>: null
      }


      <View style={styles.subContainer}>
        <Text style={{...styles.title, color: theme.text}}>User</Text>
        <View>
          <Text style={{...styles.text, color: theme.text}}>TYPE: {state.userInfo.type}</Text>
          <Text style={{...styles.text, color: theme.text}}>POINT: {state.userInfo.point}</Text>
          <Text style={{...styles.text, color: theme.text}}>CREATE AT: {convertDate(state.userInfo.createdAt)}</Text>
          <Text style={{...styles.text, color: theme.text}}>LAST UPDATE: {convertDate(state.userInfo.updatedAt)}</Text>
        </View>
      </View>
    </View>
  } else {
    return <View style={{...styles.containerSignIn, backgroundColor: theme.background}}>
      <Text style={{...styles.text, color: theme.text}}>Please sign in to view your profile</Text>
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => props.navigation.replace('Authentication')}
        title = 'SIGN IN'/>
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
