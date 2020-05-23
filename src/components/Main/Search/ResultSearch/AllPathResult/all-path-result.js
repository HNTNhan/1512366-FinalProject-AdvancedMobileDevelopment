import React from 'react';
import ListPaths from "../../../../Courses/ListPaths/list-paths";
import AllCourseResult from "../AllCourseResult/all-course-result";

const AllPathResult = (props) => {
  return <ListPaths navigation={props.navigation} route={props.route}/>
};


export default AllPathResult;
