import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import ImageButton from "../../Common/image-button";
import Skills from "./Skills/skills";
import Categories from "./Categories/categories";
import SectionCourses from "../Home/SectionCourses/section-courses";
import TopAuthors from "./TopAuthors/top-authors";
import {globalStyles} from "../../../Globles/styles";

const Browse = (props) => {

  const onPressNewReleases = () => {
    props.navigation.navigate('ListCourses', {name: 'New Releases'})
  }
  const onRecommendedForYou = () => {
    props.navigation.navigate('ListCourses', {name: 'Recommended For You'})
  }

  return <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.container}>
    <ImageButton title={`NEW\nRELEASES`} onPress={onPressNewReleases} />
    <ImageButton title={`RECOMMENDED\nFOR YOU`} onPress={onRecommendedForYou} />
    <Skills title='Popular skills' navigation={props.navigation} route={props.route}/>
    <Categories navigation={props.navigation} route={props.route}/>
    <SectionCourses title='Path'
                    type='Path'
                    navigation={props.navigation}
                    route={props.route}
                    pressSeeAll={() => props.navigation.navigate('ListPaths')}/>
    <TopAuthors title={'Top Authors'} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default Browse;
