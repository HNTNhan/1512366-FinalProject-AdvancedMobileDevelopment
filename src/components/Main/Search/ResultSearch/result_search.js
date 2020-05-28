import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import AllResultSearch from "./AllResultSearch/all-result-search";
import AllCourseResult from "./AllCourseResult/all-course-result";
import AllPathResult from "./AllPathResult/all-path-result";
import AllAuthorResult from "./AllAuthorResult/all-author-result";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {objectsConstant} from "../../../../globles/constants";
import TabBarStyle from "../../../Common/tab-bar-style";
import GeneralCourseDetail from "../../../CourseDetail/GeneralCourseDetail/general-course-detail";
import Transcript from "../../../CourseDetail/Transcript/transcript";
import ListLessons from "../../../CourseDetail/ListLessons/list-lessons";

const initialLayout = { width: Dimensions.get('window').width };

const ResultSearch = (props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'ALL' },
    { key: 'second', title: 'COURSE' },
    { key: 'third', title: 'PATHS' },
    { key: 'four', title: 'AUTHORS' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <AllResultSearch navigation={props.navigation} route={props.route}/>;
      case 'second':
        return <AllCourseResult navigation={props.navigation} route={props.route}/>;
      case 'third':
        return <AllPathResult navigation={props.navigation} route={props.route}/>;
      case 'four':
        return <AllAuthorResult navigation={props.navigation} route={props.route}/>;
      default:
        return null;
    }
  };

  return <TabView
    renderTabBar={TabBarStyle}
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={initialLayout}
  />
  // <View>
  //   {/*<AllResultSearch />*/}
  //   {/*<AllCourseResult />*/}
  //   {/*<AllPathResult />*/}
  //   {/*<AllAuthorResult />*/}
  // </View>
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tab: {
    backgroundColor: 'transparent',
    color: 'red',
    marginBottom: 50,
    width: 'auto'
  }
});

export default ResultSearch;
