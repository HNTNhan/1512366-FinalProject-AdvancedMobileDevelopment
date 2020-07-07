import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import ImageButton from "../../Common/image-button";
import Skills from "./Skills/skills";
import Categories from "./Categories/categories";
import SectionCourses from "../Home/SectionCourses/section-courses";
import TopAuthors from "./TopAuthors/top-authors";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {coursesData} from "../../../testdata/courses-data";
import {pathsData} from "../../../testdata/paths-data";
import {authorsData} from "../../../testdata/authors-data";
import {skillsData} from "../../../testdata/skills-data";
import {categoriesData} from "../../../testdata/categories-data";
import {getCoursesNewRelease} from "../../../core/services/course-services";

const Browse = (props) => {
  const {theme} = useContext(ColorsContext)
  const {user} = useContext(AuthenticationContext);
  const [newRelease, setNewRelease] = useState();
  const courses = coursesData;
  const skills = skillsData;
  const categories = categoriesData;
  const authors = authorsData;
  const paths  = pathsData

  const onPressNewReleases = () => {
    getCoursesNewRelease(1)
      .then(res => {
        props.navigation.navigate('ListCourses', {data: res.data.payload, title: false, name: 'New Releases'})
      })

  }
  const onRecommendedForYou = () => {
    props.navigation.navigate('ListCoursesScrollLoad', {url: 'https://api.itedu.me/course/top-sell', name: 'Recommended For You'})
  }

  return <ScrollView showsVerticalScrollIndicator={false} style={{...globalStyles.container, backgroundColor: theme.background}}>
    <ImageButton title={`NEW\nRELEASES`} onPress={onPressNewReleases} />
    <ImageButton title={`RECOMMENDED\nFOR YOU`} onPress={onRecommendedForYou} />
    <Skills title='Popular skills' skills={skills} interests={user.skills} navigation={props.navigation} route={props.route}/>
    <Categories categories={categories} navigation={props.navigation} route={props.route}/>
    <SectionCourses title='Path'
                    type='Path'
                    navigation={props.navigation}
                    route={props.route}
                    data={paths}
                    pressSeeAll={() => props.navigation.navigate('ListPaths', {data: paths, title: false})}/>
    <TopAuthors title={'Top Authors'} authors={authors} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default Browse;
