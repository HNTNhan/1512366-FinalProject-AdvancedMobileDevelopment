import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SectionCourses from "./SectionCourses/section-courses";
import ImageButton from "../../Common/image-button";

const Home = (props) => {

  return <ScrollView>
    <SectionCourses title='Continue learning' />
    <SectionCourses title='Path' />
    <SectionCourses title='Channel' />
    <SectionCourses title='Bookmarks' />
  </ScrollView>
};

export default Home;
