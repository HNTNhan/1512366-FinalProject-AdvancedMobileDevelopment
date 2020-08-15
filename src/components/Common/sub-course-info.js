import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";
import RatingStart from "./rating-start";
import {LanguageContext} from "../../provider/language-provider";

const SubCourseInfo = (props) => {
  const {theme} = useContext(ColorsContext);
  const {language} = useContext(LanguageContext);
  const course = props.item;
  const date = new Date(course.latestLearnTime);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNamesVi = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];

  return <View style={[styles.detail, props.section ? {borderTopColor: 'gray', borderTopWidth: 1} : null]}>
    <Text style={{...styles.title, color: theme.text}} numberOfLines={2}>{course.courseTitle || course.title}</Text>
    <Text style={styles.darkText} numberOfLines={1}>{course.instructorName || course['instructor.user.name'] || course.name}</Text>
    {
      course.process>=0 ? <Text style={styles.darkText} numberOfLines={1}>Process: {Math.round(course.process * 100) / 100}%</Text> : null
    }
    {
      course.latestLearnTime ? <Text style={styles.darkText} numberOfLines={1}>{
        `${language.same.lang==='vi' ? 'Lần cuối học: ' : 'Last learned: '}${language.same.lang==='vi' ? monthNamesVi[date.getMonth()] : 
          monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</Text> : null
    }
    {
      course.courseAveragePoint>=0 ? <RatingStart rating={course.courseAveragePoint}/> : course.formalityPoint >=0 ?
        <RatingStart rating={(course.formalityPoint + course.contentPoint + course.presentationPoint)/3} /> : null
    }
    {
      course.coursePrice>=0 ? <Text style={styles.priceText} numberOfLines={1}>{
        course.coursePrice===0 ? language.same.lang==='vi' ? 'Miễn phí' : 'Free' : course.coursePrice
      }</Text> : course.price>=0 ? <Text style={styles.priceText} numberOfLines={1}>{
        course.price===0 ? language.same.lang==='vi' ? 'Miễn phí' : 'Free' : course.price}</Text> : null
    }
  </View>
};

const styles = StyleSheet.create({
  detail: {
    paddingHorizontal: 5,
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
  },
  darkText: {
    color: '#777777',
    fontSize: 14,
  },
  priceText: {
    color: 'red',
    fontSize: 14,
  }
})

export default SubCourseInfo;
