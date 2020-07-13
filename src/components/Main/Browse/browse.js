import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
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
import {getAllCategory} from "../../../core/services/category-service";
import {getAllInstructor} from "../../../core/services/instructor-services";
import CenterActivityIndicator from "../../Common/center-activity-indicator";

const Browse = (props) => {
  const {theme} = useContext(ColorsContext)
  const [categories, setCategories] = useState(null)
  const [instructors, setInstructors] = useState(null)

  useEffect(() => {
    getAllCategory().then(res => {
      if(res.status === 200) {
        setCategories(res.data.payload)
      } else {}
    }).catch(err => {
      alert(err.response.data.message || err)
    })

    getAllInstructor().then(res => {
      if(res.status === 200) {
        setInstructors(res.data.payload)
      } else {}
    }).catch(err => {
      alert(err.response.data.message || err)
    })
  }, [])

  const onPressNewReleases = () => {
    props.navigation.navigate('ListCoursesScrollLoad', {type: 'New Releases', name: 'New Releases'})
  }
  const onRecommendedForYou = () => {
    props.navigation.navigate('ListCoursesScrollLoad', {type: 'Recommended', name: 'Recommended For You'})
  }

  if(categories && instructors) {
    return <ScrollView showsVerticalScrollIndicator={false} style={{...globalStyles.container, backgroundColor: theme.background}}>
      <View style={{...styles.imageButtonContainer}}>
        <ImageButton title={`NEW\nRELEASES`} onPress={onPressNewReleases} />
        <ImageButton title={`RECOMMENDED\nFOR YOU`} onPress={onRecommendedForYou} />
      </View>

      {/*<Skills title='Popular skills' skills={skills} interests={user.skills} navigation={props.navigation} route={props.route}/>*/}

      <Categories categories={categories} navigation={props.navigation} route={props.route}/>
      <TopAuthors title={'Top Authors'} authors={instructors} navigation={props.navigation} route={props.route}/>
    </ScrollView>
  } else {
    return <CenterActivityIndicator />
  }
};

const styles = StyleSheet.create({
  imageButtonContainer: {
    marginRight: 10,
  }
})

export default Browse;
