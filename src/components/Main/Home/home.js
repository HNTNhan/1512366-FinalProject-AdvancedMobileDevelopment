import React from 'react';
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import SectionCourses from "./SectionCourses/section-courses";
import {globalStyles} from "../../../Globles/styles";



const Home = (props) => {
  return <View style={globalStyles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <SectionCourses title='Continue learning'
                      type='Continue learning'
                      navigation={props.navigation}
                      route={props.route}
                      pressSeeAll={() => props.navigation.navigate('ListCourses')}/>
      <SectionCourses title='Path'
                      type='Path'
                      navigation={props.navigation}
                      route={props.route}
                      pressSeeAll={() => props.navigation.navigate('ListPaths')}/>
      <SectionCourses title='Channel'
                      type='Channel'
                      navigation={props.navigation}
                      route={props.route}
                      pressSeeAll={() => props.navigation.navigate('ListChannel')}/>
      <SectionCourses title='Bookmarks'
                      type='Bookmarks'
                      navigation={props.navigation}
                      route={props.route}
                      pressSeeAll={() => props.navigation.navigate('ListCourses')}/>
    </ScrollView>
  </View>
};

export default Home;
