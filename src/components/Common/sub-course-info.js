import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";
import RatingStart from "./rating-start";

const SubCourseInfo = (props) => {
  const {theme} = useContext(ColorsContext);
  const date = new Date(props.item.latestLearnTime);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return <View style={[styles.detail, props.section ? {borderTopColor: 'gray', borderTopWidth: 1} : null]}>
    <Text style={{...styles.title, color: theme.text}} numberOfLines={2}>{props.item.courseTitle}</Text>
    <Text style={styles.darkText} numberOfLines={1}>{props.item.instructorName}</Text>
    {
      props.item.process ? <Text style={styles.darkText} numberOfLines={1}>Process: {Math.round(props.item.process * 100) / 100}%</Text> : null
    }
    {
      props.item.latestLearnTime ? <Text style={styles.darkText} numberOfLines={1}>{`Last learned: ${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</Text> : null
    }
    {
      props.item.courseAveragePoint>=0 ? <RatingStart rating={props.item.courseAveragePoint}/> : null
    }
    {
      props.item.coursePrice>=0 ? <Text style={styles.priceText} numberOfLines={1}>{props.item.coursePrice===0 ? 'Free' : props.item.coursePrice}</Text> : null
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
