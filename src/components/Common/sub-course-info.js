import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";
import RatingStart from "./rating-start";

const SubCourseInfo = (props) => {
  const {theme} = useContext(ColorsContext);
  const course = props.item;
  const date = new Date(course.latestLearnTime);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return <View style={[styles.detail, props.section ? {borderTopColor: 'gray', borderTopWidth: 1} : null]}>
    <Text style={{...styles.title, color: theme.text}} numberOfLines={2}>{course.courseTitle || course.title}</Text>
    <Text style={styles.darkText} numberOfLines={1}>{course.instructorName || course['instructor.user.name']}</Text>
    {
      course.process ? <Text style={styles.darkText} numberOfLines={1}>Process: {Math.round(course.process * 100) / 100}%</Text> : null
    }
    {
      course.latestLearnTime ? <Text style={styles.darkText} numberOfLines={1}>{`Last learned: ${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</Text> : null
    }
    {
      course.courseAveragePoint>=0 ? <RatingStart rating={course.courseAveragePoint}/> : course.formalityPoint >=0 ? <RatingStart rating={(course.formalityPoint + course.contentPoint + course.presentationPoint)/3} /> : null
    }
    {
      course.coursePrice>=0 ? <Text style={styles.priceText} numberOfLines={1}>{course.coursePrice===0 ? 'Free' : course.coursePrice}</Text> :
        course.price>=0 ? <Text style={styles.priceText} numberOfLines={1}>{course.price===0 ? 'Free' : course.price}</Text> : null
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
