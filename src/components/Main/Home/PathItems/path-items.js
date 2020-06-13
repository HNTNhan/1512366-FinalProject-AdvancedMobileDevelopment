import React, {useContext} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {ColorsContext} from "../../../../provider/colors-provider";

const PathItems = (props) => {
  const {theme} = useContext(ColorsContext)

  return <TouchableOpacity style={{...styles.item, backgroundColor: theme.foreground1}} onPress={props.onPress}>
    <Image source={require('../../../../../assets/ic_course.png')} style={styles.image}/>
    <View style={{...styles.detail}}>
      <Text numberOfLines={2} style={{fontSize: 16, color: theme.text}}>{props.item.detail.title}</Text>
      <Text numberOfLines={1} style={styles.darkText}>{props.item.detail.noCourses}</Text>
    </View>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    marginRight: 10,
    marginBottom: 10,
    width: 220,
    height: 170,
    backgroundColor: 'rgb(219, 221, 231)',
    shadowColor: 'black',
    shadowOffset: { width: 10, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 25,
  },
  image: {
    width: 220,
    height: 110,
    opacity: 0.9,
  },
  detail: {
    padding: 5,
    flexShrink: 1,
    borderTopColor: 'gray',
    borderTopWidth: 1,
  },
  darkText: {
    color: '#777777',
  },
})

export default PathItems;
