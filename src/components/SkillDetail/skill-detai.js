import React from 'react';
import {ScrollView, View} from 'react-native';
import {globalStyles} from "../../Globles/styles";
import SectionCourses from "../Main/Home/SectionCourses/section-courses";
import TopAuthors from "../Main/Browse/TopAuthors/top-authors";

const SkillDetail = (props) => {
  return <ScrollView style={globalStyles.container}>
    <SectionCourses title='Path in React'
                    type='Path'
                    hasButton={false}
                    navigation={props.navigation}
                    route={props.route}/>
    <SectionCourses title='New in React'
                    type='Course'
                    navigation={props.navigation}
                    route={props.route}
                    pressSeeAll={() => props.navigation.navigate('ListCourses', {name: 'New in React'})}/>
    <SectionCourses title='Trending in React'
                    type='Course'
                    navigation={props.navigation}
                    route={props.route}
                    pressSeeAll={() => props.navigation.navigate('ListCourses', {name: 'Trending in React'})}/>
    <TopAuthors title={'Top authors in Software Development'} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default SkillDetail;
