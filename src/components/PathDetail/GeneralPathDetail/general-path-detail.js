import React, {useContext} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import DescriptionOpenClose from "../../Common/description-open-close";
import {ColorsContext} from "../../../provider/colors-provider";

const GeneralPathDetail = (props) => {
  const {theme} = useContext(ColorsContext)
  return <View style={styles.container}>
    <View style={styles.detailContainer}>
      <Image source={require('../../../../assets/ic_course.png')} style={styles.image}/>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>{props.detail.title}</Text>
        <Text style={{...styles.text, color: theme.text}}>{props.detail.noCourses} . {props.detail.duration}</Text>
      </View>
    </View>
    <DescriptionOpenClose description={props.detail.description} noLines={3} textSize={16} text={theme.text}/>
  </View>
};

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  titleContainer: {
    flexShrink: 1,
    marginLeft: 10,
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
