import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View, ActivityIndicator} from 'react-native';
import SectionCourses from "../Main/Home/SectionCourses/section-courses";
import {globalStyles} from "../../globles/styles";
import {ColorsContext} from "../../provider/colors-provider";
import {searchCourses} from "../../core/services/course-services";
import CenterActivityIndicator from "../Common/center-activity-indicator";

const CategoryDetail = (props) => {
  const {theme} = useContext(ColorsContext);
  const [newCourses, setNewCourses] = useState(null);
  const [trendingCourses, setTrendingCourses] = useState(null);

  const category = props.route.params.category;
  const paramNewCourse = {attribute: "updatedAt", rule: "ASC", category: [category.id]};
  const paramTrendingCourse = {attribute: "soldNumber", rule: "DESC", category: [category.id]};

  useEffect(() => {
    searchCourses("", "updatedAt", "ASC",[category.id])
      .then(res => {
        if(res.status === 200) {
          setNewCourses(res.data.payload.rows)
        } else {}
      })
      .catch(err => {
        alert(err.response.data.message || err)
      })

    searchCourses("", "soldNumber", "DESC",[category.id])
      .then(res => {
        if(res.status === 200) {
          setTrendingCourses(res.data.payload.rows)
        } else {}
      })
      .catch(err => {
        alert(err.response.data.message || err)
      })
  }, [])

  return <View style={{...globalStyles.container, backgroundColor: theme.background}}>
    {
      newCourses && trendingCourses ?
        <ScrollView>
          {/*<FavoriteCategories title={category.title + ' FavoriteCategories'} skills={skills} interests={user.skills} navigation={props.navigation} route={props.route}/>*/}
          <SectionCourses title={'New in ' + category.name}
                          type='Course'
                          navigation={props.navigation}
                          route={props.route}
                          data={newCourses}
                          pressSeeAll={() => newCourses.length ? props.navigation.navigate('ListCoursesScrollLoad', {type: 'Category', paramSearch: paramNewCourse,name: 'New in ' + category.name}) : null}
          />
          <SectionCourses title={'Trending in ' + category.name}
                          type='Course'
                          navigation={props.navigation}
                          route={props.route}
                          data={trendingCourses}
                          pressSeeAll={() => trendingCourses.length ? props.navigation.navigate('ListCoursesScrollLoad', {type: 'Category', paramSearch: paramTrendingCourse, name: 'Trending in ' + category.title, title: false}) : null}
          />
          {/*<TopAuthors title={'Top authors in Software Development'} authors={authors} navigation={props.navigation} route={props.route}/>*/}
        </ScrollView> :
        <CenterActivityIndicator />
    }

  </View>
};

export default CategoryDetail;