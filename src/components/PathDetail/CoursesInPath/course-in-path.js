import React from 'react';
import {SectionList, Text, View} from 'react-native';
import {renderSeparator} from "../../../globles/constants";
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {findByKey} from "../../../testdata/find-data";
import {coursesData} from "../../../testdata/courses-data";

const CourseInPath = (props) => {
  const onPress = (key) => {
    props.navigation.navigate('CourseDetail', {key: key})
  }

  // for(let i=0; i<props.courses.length; i++){
  //   props.courses[i].data = findByKey(coursesData, props.courses[i].data);
  // }
  return <SectionList
    sections={props.courses}
    keyExtractor={(item, index) => item + index}
    renderItem={({item}) => {
      const temp=findByKey(coursesData, [item])[0];
      return <ListCourseItems item={temp} onPress={() => onPress(temp.key)}/>
    }}
    renderSectionHeader={({ section: { titleCourse } }) => <Text>{titleCourse}</Text>}
    ItemSeparatorComponent= {renderSeparator}
  />
};

export default CourseInPath;
