import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import DescriptionOpenClose from "../../Common/description-open-close";

const GeneralPathDetail = (props) => {
  return <View style={styles.container}>
    <View style={styles.detailContainer}>
      <Image source={require('../../../../assets/ic_course.png')} style={styles.image}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.detail.title}</Text>
        <Text style={styles.text}>{props.detail.noCourses} . {props.detail.duration}</Text>
      </View>
    </View>
    <DescriptionOpenClose description={props.detail.description} noLines={3} textSize={16}/>
  </View>
};

const styles = StyleSheet.create({
  container: {

  },
  detailContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  titleContainer: {
    marginLeft: 20,
  },
  image: {
    width: 100,
    height: 70,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
  }
})
export default GeneralPathDetail;
