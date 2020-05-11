import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import ImageButton from "../../Common/image-button";
import PopularSkills from "./PopularSkills/popular-skills";
import Categories from "./Categories/categories";
import SectionCourses from "../Home/SectionCourses/section-courses";
import TopAuthors from "./TopAuthors/top-authors";

const Browse = (props) => {

  const onPressNewReleases = () => {
    console.log('New Releases')
  }
  const onRecommendedForYou = () => {
    console.log('RecommendedForYou')
  }

  return <ScrollView showsVerticalScrollIndicator={false}>
    <ImageButton title={`NEW\nRELEASES`} onPress={onPressNewReleases} />
    <ImageButton title={`RECOMMENDED\nFOR YOU`} onPress={onRecommendedForYou} />
    <PopularSkills title='Popular skills' />
    <Categories />
    <SectionCourses title='Path' />
    <TopAuthors title={'Top Authors'}/>
  </ScrollView>
};

export default Browse;
