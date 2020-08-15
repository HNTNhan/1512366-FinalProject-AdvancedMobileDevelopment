import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ImageButton from "../../Common/image-button";
import Categories from "./Categories/categories";
import TopAuthors from "./TopAuthors/top-authors";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {getAllCategory} from "../../../core/services/category-service";
import {getAllInstructor} from "../../../core/services/instructor-services";
import CenterActivityIndicator from "../../Common/center-activity-indicator";
import {LanguageContext} from "../../../provider/language-provider";

const Browse = (props) => {
  const {theme} = useContext(ColorsContext)
  const {language} = useContext(LanguageContext)
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
    props.navigation.navigate('ListCoursesScrollLoad', {type: 'New Releases', name: language.browse.newReleases})
  }
  const onRecommendedForYou = () => {
    props.navigation.navigate('ListCoursesScrollLoad', {type: 'Recommended', name: language.browse.recommended})
  }

  if(categories && instructors) {
    return <ScrollView showsVerticalScrollIndicator={false} style={{...globalStyles.container, backgroundColor: theme.background}}>
      <View style={{...styles.imageButtonContainer}}>
        <ImageButton title={language.browse.buttonNewReleases} onPress={onPressNewReleases} />
        <ImageButton title={language.browse.buttonRecommended} onPress={onRecommendedForYou} />
      </View>

      <Categories categories={categories} navigation={props.navigation} route={props.route} language={language}/>
      <TopAuthors title={language.browse.topAuthor} authors={instructors} navigation={props.navigation} route={props.route}/>
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
