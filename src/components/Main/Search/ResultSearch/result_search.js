import React from 'react';
import {View} from 'react-native';
import AllResultSearch from "./AllResultSearch/all-result-search";
import AllCourseResult from "./AllCourseResult/all-course-result";
import AllPathResult from "./AllPathResult/all-path-result";
import AllAuthorResult from "./AllAuthorResult/all-author-result";

const ResultSearch = (props) => {
  return <View>
    {/*<AllResultSearch />*/}
    {/*<AllCourseResult />*/}
    {/*<AllPathResult />*/}
    <AllAuthorResult />
  </View>
};

export default ResultSearch;
