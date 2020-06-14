import React, {useContext} from 'react';
import {SectionList, Text, View} from 'react-native';
import {renderSeparator} from "../../../globles/constants";
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {findByKey} from "../../../testdata/find-data";
import {coursesData} from "../../../testdata/courses-data";
import {ColorsContext} from "../../../provider/colors-provider";

const CourseInPath = (props) => {
  const {theme} = useContext(ColorsContext)

  const onPress = (key) => {
    props.navigation.navigate('CourseDetail', {key: key})
  }

  return <SectionList
    sections={props.courses}
    keyExtractor={(item, index) => item + index}
    renderItem={({item}) => {
      const temp=findByKey(coursesData, [item])[0];
      return <ListCourseItems item={temp} onPress={() => onPress(temp.key)}/>
    }}
    renderSectionHeader={({ section: { titleCourse } }) => <Text style={{color: theme.text}}>{titleCourse}</Text>}
    ItemSeparatorComponent= {renderSeparator}
  />
};

export default CourseInPath;
