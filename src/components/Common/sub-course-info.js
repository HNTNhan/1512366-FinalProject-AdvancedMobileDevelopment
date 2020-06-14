import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";

const SubCourseInfo = (props) => {
  const {theme} = useContext(ColorsContext)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return <View style={[styles.detail, props.section ? {borderTopColor: 'gray', borderTopWidth: 1} : null]}>
    <Text style={{...styles.title, color: theme.text}} numberOfLines={2}>{props.item.title}</Text>
    <Text style={styles.darkText} numberOfLines={1}>{props.item.author.join(', ')}</Text>
    <Text style={styles.darkText} numberOfLines={1}>{`${props.item.level} . ${monthNames[props.item.released.getMonth()]} ${props.item.released.getDate()} ${props.item.released.getFullYear()} . ${props.item.duration}`}</Text>
  </View>
};

const styles = StyleSheet.create({
  detail: {
    padding: 5,
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
  },
  darkText: {
    color: '#777777',
    fontSize: 14,
  },
})

export default SubCourseInfo;
