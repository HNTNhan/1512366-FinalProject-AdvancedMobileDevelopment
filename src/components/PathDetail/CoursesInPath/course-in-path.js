import React from 'react';
import {SectionList, Text, View} from 'react-native';
import {renderSeparator} from "../../../Globles/constants";
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";

const CourseInPath = (props) => {
  return <SectionList
    sections={props.courses}
    keyExtractor={(item, index) => item + index}
    renderItem={({item}) => <ListCourseItems item={item}/>}
    renderSectionHeader={({ section: { titleCourse } }) => <Text>{titleCourse}</Text>}
    ItemSeparatorComponent= {renderSeparator}
  />
};

export default CourseInPath;
