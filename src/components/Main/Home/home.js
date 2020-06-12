import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import SectionCourses from "./SectionCourses/section-courses";
import {globalStyles} from "../../../globles/styles";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {coursesData} from "../../../testdata/courses-data";
import {findByKey} from "../../../testdata/find-data";
import {pathsData} from "../../../testdata/paths-data";
import {ColorsContext} from "../../../provider/colors-provider";



const Home = (props) => {
  const {theme} = useContext(ColorsContext)
  const {user} = useContext(AuthenticationContext);
  const courses = findByKey(coursesData, user.continueLearning);
  const bookmarks = findByKey(coursesData, user.bookmarks);
  const paths  = findByKey(pathsData, user.paths);
  const channels = user.channels;

  return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <SectionCourses title='Continue learning'
                      type='Course'
                      navigation={props.navigation}
                      route={props.route}
                      data={courses}
                      pressSeeAll={() => props.navigation.navigate('ListCourses', {data: courses, title: false, name: 'Continue learning'})}/>
      <SectionCourses title='Paths'
                      type='Path'
                      navigation={props.navigation}
                      route={props.route}
                      data={paths}
                      pressSeeAll={() => props.navigation.navigate('ListPaths', {data: paths, title: false})}/>
      <SectionCourses title='Channels'
                      type='Channel'
                      navigation={props.navigation}
                      route={props.route}
                      data={channels}
                      pressSeeAll={() => props.navigation.navigate('ListChannels', {data: channels, title: false})}/>
      <SectionCourses title='Bookmarks'
                      type='Course'
                      navigation={props.navigation}
                      route={props.route}
                      data={bookmarks}
                      pressSeeAll={() => props.navigation.navigate('ListCourses', {data: bookmarks, title: false, name: 'Bookmarks'})}/>
    </ScrollView>
  </View>
};

export default Home;
