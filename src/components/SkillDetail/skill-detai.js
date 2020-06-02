import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import {globalStyles} from "../../globles/styles";
import SectionCourses from "../Main/Home/SectionCourses/section-courses";
import TopAuthors from "../Main/Browse/TopAuthors/top-authors";
import {ColorsContext} from "../../provider/colors-provider";
import {AuthenticationContext} from "../../provider/authentication-provider";
import {findByKey} from "../../testdata/find-data";
import {coursesData} from "../../testdata/courses-data";
import {pathsData} from "../../testdata/paths-data";
import {authorsData} from "../../testdata/authors-data";

const SkillDetail = (props) => {
  const {defaultBackgroundColor} = useContext(ColorsContext)
  const courses = findByKey(coursesData, props.route.params.skill.courses);
  const paths  = findByKey(pathsData, props.route.params.skill.paths);
  const authors = findByKey(authorsData, props.route.params.skill.authors)

  return <ScrollView style={[globalStyles.container, {backgroundColor: defaultBackgroundColor.background}]}>
    <SectionCourses title={'Path in ' + props.route.params.skill.title}
                    type='Path'
                    hasButton={false}
                    navigation={props.navigation}
                    route={props.route}
                    data={paths}/>
    <SectionCourses title={'New in ' + props.route.params.skill.title}
                    type='Course'
                    navigation={props.navigation}
                    route={props.route}
                    data={courses}
                    pressSeeAll={() => courses.length ? props.navigation.navigate('ListCourses', {data: courses, title: false, name: 'New in React'}) : null}/>
    <SectionCourses title={'Trending in ' + props.route.params.skill.title}
                    type='Course'
                    navigation={props.navigation}
                    route={props.route}
                    data={courses}
                    pressSeeAll={() => courses.length ? props.navigation.navigate('ListCourses', {data: courses, title: false, name: 'Trending in React'}) : null}/>
    <TopAuthors title={'Top authors in Software Development'} authors={authors} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default SkillDetail;
