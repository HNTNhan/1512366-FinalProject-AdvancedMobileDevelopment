import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TabView} from 'react-native-tab-view';
import TabBarStyle from "../../../Common/tab-bar-style";
import Courses from "../../../Courses/courses";
import {
  findAuthorByName, findAuthorsThroughName,
  findCoursesThroughName, findPathsThroughName,
} from "../../../../testdata/find-data";
import {coursesData} from "../../../../testdata/courses-data";
import {pathsData} from "../../../../testdata/paths-data";
import {authorsData} from "../../../../testdata/authors-data";
import ListCourses from "../../../Courses/ListCourses/list-courses";
import ListPaths from "../../../Courses/ListPaths/list-paths";
import ListAuthors from "../../../Courses/ListAuthors/list-authors";
import {Icon} from "react-native-elements";

const initialLayout = { width: Dimensions.get('window').width };

const ResultSearch = (props) => {
  let allData;
  const constCourses = findCoursesThroughName(coursesData, props.searchKey);
  const [courses, setCourse] = useState(constCourses);
  const paths = findPathsThroughName(pathsData, props.searchKey);
  let authors = findAuthorsThroughName(authorsData, props.searchKey);

  if(courses.length) {
    const authorsOfCourses = courses.map(course => course.author.join()).join().split(',');
    authors = authors.concat(findAuthorByName(authorsData, authorsOfCourses));
    authors = [...new Set(authors)]
  }

  courses.length || paths.length || authors.length ? allData = [
    {
      title: 'Courses',
      amount: courses.length ? (courses.length + (courses.length>1 ? ' Courses' : ' Course')) : null,
      data: courses.length<=5 ? courses : courses.slice(0, 5),
    },
    {
      title: 'Paths',
      amount: paths.length ? (paths.length + (paths.length>1 ? ' Paths' : ' Path')) : null,
      data: paths.length<=5 ? paths : paths.slice(0, 5),
    },
    {
      title: 'Authors',
      amount: authors.length ? (authors.length + (authors.length>1 ? ' Authors' : ' Author')) : null,
      data: authors.length<=5 ? authors : authors.slice(0, 5),
    }
  ] : allData = null;

  const onPressFilterLevel = () => {
    setCourse(constCourses.filter(course => course.level==='Beginner'))
  }

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'ALL' },
    { key: 'second', title: 'COURSE' },
    { key: 'third', title: 'PATHS' },
    { key: 'four', title: 'AUTHORS' },
  ]);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'first':
        return <Courses data={allData} tapRoute={route} jumpTo={jumpTo} route={props.route} navigation={props.navigation}/>
      case 'second':
        return <ListCourses data={courses} route={props.route} navigation={props.navigation} title={courses.length + ' Courses'} titleType={1}
                            filterText1={'filterText1'} filterText2={'filterText2'} onPressFilterLevel={() => onPressFilterLevel()}/>;
      case 'third':
        return <ListPaths data={paths} route={props.route} navigation={props.navigation}/>;
      case 'four':
        return <ListAuthors data={authors} route={props.route} navigation={props.navigation}/>;
      default:
        return null;
    }
  };

  return allData ? <TabView
    renderTabBar={TabBarStyle}
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={initialLayout}
  /> : <View style={styles.containerNotFound}>
    <Icon name={'search'} type={"font-awesome-5"} />
    <Text style={styles.textNotFound}>{`Sorry we couldn't find any matches for \n "${props.searchKey}"`}</Text>
  </View>
};

const styles = StyleSheet.create({
  textNotFound: {
    fontSize: 16,
    textAlign: 'center',
  },
  containerNotFound: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default ResultSearch;
