import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import SectionCourses from "./SectionCourses/section-courses";
import {globalStyles} from "../../../globles/styles";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {coursesData} from "../../../testdata/courses-data";
import {findByKey} from "../../../testdata/find-data";
import {pathsData} from "../../../testdata/paths-data";



const Home = (props) => {
  const {user} = useContext(AuthenticationContext);
  const courses = findByKey(coursesData, user.continueLearning);
  const bookmarks = findByKey(coursesData, user.bookmarks);
  const paths  = findByKey(pathsData, user.paths);
  const channels = user.channels;

  return <View style={globalStyles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <SectionCourses title='Continue learning'
                      type='Continue learning'
                      navigation={props.navigation}
                      route={props.route}
                      data={courses}
                      pressSeeAll={() => props.navigation.navigate('ListCourses')}/>
      <SectionCourses title='Path'
                      type='Path'
                      navigation={props.navigation}
                      route={props.route}
                      data={paths}
                      pressSeeAll={() => props.navigation.navigate('ListPaths')}/>
      <SectionCourses title='Channel'
                      type='Channel'
                      navigation={props.navigation}
                      route={props.route}
                      data={channels}
                      pressSeeAll={() => props.navigation.navigate('ListChannel')}/>
      <SectionCourses title='Bookmarks'
                      type='Bookmarks'
                      navigation={props.navigation}
                      route={props.route}
                      data={bookmarks}
                      pressSeeAll={() => props.navigation.navigate('ListCourses')}/>
    </ScrollView>
  </View>
};

export default Home;
