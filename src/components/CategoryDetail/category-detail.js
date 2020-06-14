import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import Skills from "../Main/Browse/Skills/skills";
import SectionCourses from "../Main/Home/SectionCourses/section-courses";
import {globalStyles} from "../../globles/styles";
import TopAuthors from "../Main/Browse/TopAuthors/top-authors";
import {AuthenticationContext} from "../../provider/authentication-provider";
import {findByKey, findSkillByName} from "../../testdata/find-data";
import {skillsData} from "../../testdata/skills-data";
import {pathsData} from "../../testdata/paths-data";
import {coursesData} from "../../testdata/courses-data";
import {authorsData} from "../../testdata/authors-data";
import {ColorsContext} from "../../provider/colors-provider";

const CategoryDetail = (props) => {
  const category = props.route.params.category;
  const {user} = useContext(AuthenticationContext);
  const {theme} = useContext(ColorsContext);
  const skills = findSkillByName(skillsData, category.skills);
  const paths = findByKey(pathsData, category.paths);
  const newCourses = findByKey(coursesData, category.new);
  const trendingCourses = findByKey(coursesData, category.trending);
  const authors = findByKey(authorsData, category.authors)

  return <View style={{...globalStyles.container, backgroundColor: theme.background}}>
    <ScrollView>
      <Skills title={category.title + ' Skills'} skills={skills} interests={user.skills} navigation={props.navigation} route={props.route}/>
      <SectionCourses title={'Paths in ' + category.title}
                      type='Path'
                      navigation={props.navigation}
                      route={props.route}
                      data={paths}
                      pressSeeAll={() => paths.length ? props.navigation.navigate('ListPaths', {data: paths, title: false, name: 'Paths in ' + category.title}) : null}/>
      <SectionCourses title={'New in ' + category.title}
                      type='Course'
                      navigation={props.navigation}
                      route={props.route}
                      data={newCourses}
                      pressSeeAll={() => newCourses.length ? props.navigation.navigate('ListCourses', {data: newCourses, name: 'New in ' + category.title, title: false}) : null}/>
      <SectionCourses title={'Trending in ' + category.title}
                      type='Course'
                      navigation={props.navigation}
                      route={props.route}
                      data={trendingCourses}
                      pressSeeAll={() => trendingCourses.length ? props.navigation.navigate('ListCourses', {data: trendingCourses, name: 'Trending in ' + category.title, title: false}) : null}/>
      <TopAuthors title={'Top authors in Software Development'} authors={authors} navigation={props.navigation} route={props.route}/>
    </ScrollView>
  </View>
};

export default CategoryDetail;