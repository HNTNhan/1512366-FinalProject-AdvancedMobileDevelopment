import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import GeneralPathDetail from "./GeneralPathDetail/general-path-detail";
import PathProgress from "./PathProgress/path-progress";
import CourseInPath from "./CoursesInPath/course-in-path";
import {globalStyles} from "../../globles/styles";
import {findByKey} from "../../testdata/find-data";
import {pathsData} from "../../testdata/paths-data";
import {coursesData} from "../../testdata/courses-data";
import {ColorsContext} from "../../provider/colors-provider";

const PathDetail = (props) => {
  const {defaultBackgroundColor} = useContext(ColorsContext)
  const paths = findByKey(pathsData, [props.route.params.key])[0];

  return <ScrollView style={[globalStyles.container, {backgroundColor: defaultBackgroundColor.background}]}>
    <GeneralPathDetail detail={paths.detail}/>
    <PathProgress progress={paths.progress}/>
    <CourseInPath type={paths.type} courses={paths.listCourses} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default PathDetail;
