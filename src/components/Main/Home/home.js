import React from 'react';
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import SectionCourses from "./SectionCourses/section-courses";
import {globalStyles} from "../../../Globles/styles";



const Home = (props) => {
  return <View style={globalStyles.container}>
    <ScrollView>
      <SectionCourses title='Continue learning' />
      <SectionCourses title='Path' />
      <SectionCourses title='Channel' />
      <SectionCourses title='Bookmarks' />
    </ScrollView>
  </View>
};

export default Home;
