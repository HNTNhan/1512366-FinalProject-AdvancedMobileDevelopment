import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator, Text} from 'react-native';
import SectionCourses from "./SectionCourses/section-courses";
import {globalStyles} from "../../../globles/styles";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {ColorsContext} from "../../../provider/colors-provider";
import {UserContext} from "../../../provider/user-provider";
import {Button, Icon} from "react-native-elements";
import CenterActivityIndicator from "../../Common/center-activity-indicator";
import {getChannel} from "../../../core/local_storage/channel-storage";
import {getCoursesNewRelease, getCoursesTopRate} from "../../../core/services/course-services";
import {LanguageContext} from "../../../provider/language-provider";

const Home = (props) => {
  const {theme} = useContext(ColorsContext);
  const {language} = useContext(LanguageContext)
  const {state} = useContext(AuthenticationContext);
  const userContext = useContext(UserContext);
  const [channels, setChannels] = useState([]);
  const [newAndRecomendCourses, setNewAndRecomendCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const fetchChannel = () => {
    if(state.isAuthenticated) {
      getChannel().then(res =>{
        if(res.status===200) {
          if(res.data.length) {
            for(let i=0; i<res.data.length; i++) {
              if(res.data[i].id === state.userInfo.id) {
                setChannels(res.data[i].channels)
                return
              }
            }
            setChannels([])
          } else {
            setChannels([])
          }
        } else {}
      }).catch(err => {
        alert(err)
        setChannels([])
      })
    } else {
      setChannels([])
    }
  }

  useEffect(() =>{                                 //Lay cac khoa hoc thich va dang hoc
    let mounted = true
    if(state.isAuthenticated) {
      if (!userContext.state.continueCouresRequest) {
        userContext.fetchContinueCourses(state.token)
      } else {}
      if (!userContext.state.favoriteCoursesRequest) {
        userContext.fetchFavoriteCourses(state.token)
      } else {}
      Promise.all([getCoursesNewRelease(0, 8), getCoursesTopRate(0, 8)]).then(res => {
        if(mounted) {
          setNewAndRecomendCourses([res[0].data.payload, res[1].data.payload])
          setIsLoading(false)
        } else {}
      }).catch((err) => {
        alert(err)
        setNewAndRecomendCourses([[], []])
      })
      fetchChannel()
    } else {}
    return () => mounted = false
  }, [])

  useEffect(() => {                               //Cap nhat channel
    if(state.isAuthenticated) {
      if(userContext.state.isUpdateChannel) {
        fetchChannel()
        userContext.endUpdateChanel()
      } else {}
    } else {}
  }, [userContext.state.isUpdateChannel])

  useEffect(() => {                              //Cap nhat cac khoa dang hoc
    if(state.isAuthenticated) {
      if (userContext.state.isUpdateContinueCourse) {
        userContext.fetchContinueCourses(state.token)
        userContext.endUpdateChanel()
      } else {}
    } else{}
  }, [userContext.state.isUpdateContinueCourse])

  useEffect(() => {                              //Cap nhat cac khoa thich
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
        (!userContext.state.favoriteCoursesRequest || !userContext.state.continueCouresRequest) && !isLoading?
          <ScrollView showsVerticalScrollIndicator={false}>
            <SectionCourses title={language.home.new}
                            type='Course'
                            navigation={props.navigation}
                            route={props.route}
                            data={newAndRecomendCourses[0].slice(0, 8)}
                            pressSeeAll={() => props.navigation.navigate('ListCoursesScrollLoad', {type: 'New Releases', name: language.home.new})}
            />
            <SectionCourses title={language.home.recommend}
                            type='Course'
                            navigation={props.navigation}
                            route={props.route}
                            data={newAndRecomendCourses[1].slice(0, 8)}
                            pressSeeAll={() => props.navigation.navigate('ListCoursesScrollLoad', {type: 'Top Rate', name: language.home.recommend})}
            />
            <SectionCourses title={language.home.continue}
                           type='Course'
                           navigation={props.navigation}
                           route={props.route}
                           data={userContext.state.continueCoures.slice(0, 8)}
                           pressSeeAll={() => props.navigation.navigate('ListCourses', {
                             data: userContext.state.continueCoures,
                             title: false,
                             name: language.home.recommend
                           })}/>
            <SectionCourses title={language.home.favorite}
                             type='Course'
                             navigation={props.navigation}
                             route={props.route}
                             data={userContext.state.favoriteCourses.slice(0, 8)}
                             pressSeeAll={() => props.navigation.navigate('ListCourses', {
                               data: userContext.state.favoriteCourses,
                               title: false,
                               name: language.home.favorite
                             })}/>
            <SectionCourses title={language.home.channels}
                             type='Channel'
                             navigation={props.navigation}
                             route={props.route}
                             data={channels}
                             fetchChannel={() => fetchChannel()}
                             pressSeeAll={() => props.navigation.navigate('ListChannels', {
                               data: channels,
                               title: false,
                               name: language.home.channels
                             })}/>
          </ScrollView>
        : <CenterActivityIndicator /> :
        <View style={{...styles.container}}>
          <Text style={{...styles.title, color: theme.text}}>{language.home.description}</Text>
          <View style={{...styles.subContiner}}>
            <Icon name={'th'} type={"font-awesome-5"} color={'#19B5FE'} size={30} onPress={() => props.navigation.navigate('Browse')}/>
            <Text style={{...styles.text, color: theme.text}}>{language.home.browse}</Text>
          </View>
          <View style={{...styles.subContiner}}>
            <Icon name={'search'} type={"font-awesome-5"} color={'#19B5FE'} size={30} onPress={() => props.navigation.navigate('Search')}/>
            <Text style={{...styles.text, color: theme.text}}>{language.home.search}</Text>
          </View>
          <Button
            buttonStyle={styles.signInButton}
            titleStyle={styles.signInButtonText}
            onPress={() => props.navigation.replace('Authentication')}
            title={language.home.buttonSignIn}/>
        </View>
    }
  </View>
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
