import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import SectionCourses from "./SectionCourses/section-courses";
import {globalStyles} from "../../../globles/styles";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {coursesData} from "../../../testdata/courses-data";
import {findByKey} from "../../../testdata/find-data";
import {pathsData} from "../../../testdata/paths-data";
import {ColorsContext} from "../../../provider/colors-provider";
import {getContinueCourses, getFavoriteCourses} from "../../../core/services/user-services";

const Home = (props) => {
  const {theme} = useContext(ColorsContext)
  const {user1} = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() =>{
    Promise.all([getContinueCourses(user1.token), getFavoriteCourses(user1.token)])
      .then((res) => {
        if(data !== res){
          setData(res)
          setIsLoading(false)
        } else {

        }
      })
  }, [])

  return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
    {
      !isLoading ?
        <ScrollView showsVerticalScrollIndicator={false}>
          <SectionCourses title='Continue learning'
                          type='Course'
                          navigation={props.navigation}
                          route={props.route}
                          data={data[0]}
                          pressSeeAll={() => props.navigation.navigate('ListCourses', {data: data[0], title: false, name: 'Continue learning'})}/>
          <SectionCourses title='Favorite courses'
                          type='Course'
                          navigation={props.navigation}
                          route={props.route}
                          data={data[1]}
                          pressSeeAll={() => props.navigation.navigate('ListCourses', {data: data[1], title: false, name: 'Favorite courses'})}/>
        </ScrollView>
      : null
    }

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
  </View>
};

export default Home;
