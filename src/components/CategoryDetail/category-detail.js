import React from 'react';
import {ScrollView, View} from 'react-native';
import Skills from "../Main/Browse/Skills/skills";
import SectionCourses from "../Main/Home/SectionCourses/section-courses";
import {globalStyles} from "../../Globles/styles";
import TopAuthors from "../Main/Browse/TopAuthors/top-authors";

const CategoryDetail = (props) => {
  const categoryDetail = {
    title: 'Software Development Skills',
    skills: [
      {
        id: 1,
        name: 'Angular',
        checked: false,
      },
      {
        id: 2,
        name: 'JavaScript',
        checked: true,
      },
      {
        id: 3,
        name: 'C#',
        checked: false,
      },
      {
        id: 4,
        name: 'Java',
        checked: false,
      },
      {
        id: 5,
        name: 'Python',
        checked: false,
      },
      {
        id: 6,
        name: 'React',
        checked: true,
      },
    ],

  }
  return <View style={globalStyles.container}>
    <ScrollView>
      <Skills title={categoryDetail.title} skills={categoryDetail.skills}  navigation={props.navigation} route={props.route}/>
      <SectionCourses title='Paths in Software Development'
                      type='Path'
                      navigation={props.navigation}
                      route={props.route}
                      pressSeeAll={() => props.navigation.navigate('ListPaths')}/>
      <SectionCourses title='New in Software Development'
                      type='Course'
                      navigation={props.navigation}
                      route={props.route}
                      pressSeeAll={() => props.navigation.navigate('ListCourses', {name: 'New in Software Development'})}/>
      <SectionCourses title='Trending in Software Development'
                      type='Course'
                      navigation={props.navigation}
                      route={props.route}
                      pressSeeAll={() => props.navigation.navigate('ListCourses', {name: 'Trending in Software Development'})}/>
      <TopAuthors title={'Top authors in Software Development'} navigation={props.navigation} route={props.route}/>
    </ScrollView>
  </View>
};

export default CategoryDetail;
