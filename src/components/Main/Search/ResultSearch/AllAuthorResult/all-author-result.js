import React from 'react';
import ListAuthors from "../../../../Courses/ListAuthors/list-authors";
import AllCourseResult from "../AllCourseResult/all-course-result";

const AllAuthorResult = (props) => {
  return <ListAuthors navigation={props.navigation} route={props.route}/>
};

export default AllAuthorResult;
