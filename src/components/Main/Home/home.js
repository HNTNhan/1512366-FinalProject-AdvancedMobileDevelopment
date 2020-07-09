import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator, Text} from 'react-native';
import SectionCourses from "./SectionCourses/section-courses";
import {globalStyles} from "../../../globles/styles";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {ColorsContext} from "../../../provider/colors-provider";
import {UserContext} from "../../../provider/user-provider";
import {Button, Icon} from "react-native-elements";

const Home = (props) => {
  const {theme} = useContext(ColorsContext)
  const {state} = useContext(AuthenticationContext);
  const userContext = useContext(UserContext)

  useEffect(() =>{
    if(state.isAuthenticated) {
      if (!userContext.state.continueCouresRequest) {
        userContext.fetchContinueCourses(state.token)
      } else {}

      if (!userContext.state.favoriteCoursesRequest) {
        userContext.fetchFavoriteCourses(state.token)
      } else {}
    } else {}
  }, [])

  useEffect(() => {
    if(state.isAuthenticated) {
      if (userContext.state.favoriteCoursesChange) {
        if (!userContext.state.favoriteCoursesRequest) {
          userContext.fetchFavoriteCourses(state.token)
        } else {}
      } else {}
    } else{}
  }, [userContext.state.favoriteCoursesChange])


  return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
    {
      state.isAuthenticated ?
        !userContext.state.favoriteCoursesRequest || !userContext.state.continueCouresRequest ?
          <ScrollView showsVerticalScrollIndicator={false}>
              <SectionCourses title='Continue learning'
                             type='Course'
                             navigation={props.navigation}
                             route={props.route}
                             data={userContext.state.continueCoures}
                             pressSeeAll={() => props.navigation.navigate('ListCourses', {
                               data: userContext.state.continueCoures,
                               title: false,
                               name: 'Continue learning'
                             })}/>
              <SectionCourses title='Favorite courses'
                             type='Course'
                             navigation={props.navigation}
                             route={props.route}
                             data={userContext.state.favoriteCourses}
                             pressSeeAll={() => props.navigation.navigate('ListCourses', {
                               data: userContext.state.favoriteCourses,
                               title: false,
                               name: 'Favorite courses'
                             })}/>
          </ScrollView>
        : <ActivityIndicator size="large" color="#0000ff"/> :
        <View style={{...styles.container}}>
          <Text style={{...styles.title, color: theme.text}}>Let's get you started</Text>
          <View style={{...styles.subContiner}}>
            <Icon name={'th'} type={"font-awesome-5"} color={'#19B5FE'} size={30} onPress={() => props.navigation.navigate('Browse')}/>
            <Text style={{...styles.text, color: theme.text}}>Browse new & popular courses</Text>
          </View>
          <View style={{...styles.subContiner}}>
            <Icon name={'search'} type={"font-awesome-5"} color={'#19B5FE'} size={30} onPress={() => props.navigation.navigate('Search')}/>
            <Text style={{...styles.text, color: theme.text}}>Search the library</Text>
          </View>
          <Button
            buttonStyle={styles.signInButton}
            titleStyle={styles.signInButtonText}
            onPress={() => props.navigation.replace('Authentication')}
            title = 'SIGN IN'/>
        </View>
    }
  </View>
    {/*<SectionCourses title='Continue learning'*/}
    {/*                type='Course'*/}
    {/*                navigation={props.navigation}*/}
    {/*                route={props.route}*/}
    {/*                data={courses}*/}
    {/*                pressSeeAll={() => props.navigation.navigate('ListCourses', {data: courses, title: false, name: 'Continue learning'})}/>*/}
    {/*<SectionCourses title='Paths'*/}
    {/*                type='Path'*/}
    {/*                navigation={props.navigation}*/}
    {/*                route={props.route}*/}
    {/*                data={paths}*/}
    {/*                pressSeeAll={() => props.navigation.navigate('ListPaths', {data: paths, title: false})}/>*/}
    {/*<SectionCourses title='Channels'*/}
    {/*                type='Channel'*/}
    {/*                navigation={props.navigation}*/}
    {/*                route={props.route}*/}
    {/*                data={channels}*/}
    {/*                pressSeeAll={() => props.navigation.navigate('ListChannels', {data: channels, title: false})}/>*/}
    {/*<SectionCourses title='Bookmarks'*/}
    {/*                type='Course'*/}
    {/*                navigation={props.navigation}*/}
    {/*                route={props.route}*/}
    {/*                data={bookmarks}*/}
    {/*                pressSeeAll={() => props.navigation.navigate('ListCourses', {data: bookmarks, title: false, name: 'Bookmarks'})}/>*/}

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    padding: 5,
  },
  subContiner: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 15,
    padding: 5,
  },
  signInButton: {
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#19B5FE',
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
})
export default Home;
