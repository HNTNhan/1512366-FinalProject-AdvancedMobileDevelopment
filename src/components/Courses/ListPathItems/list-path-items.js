import React, {useContext} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";

const ListPathItems = (props) => {
  const {theme} = useContext(ColorsContext);
  return <TouchableOpacity style={styles.item} onPress={props.onPress}>
    <Image source={require('../../../../assets/ic_course.png')} style={styles.image}/>
    <View style={styles.detail}>
      <Text style={{fontSize: 16, color: theme.text}}>{props.item.detail.title}</Text>
      <Text style={styles.darkText}>{props.item.detail.noCourses}</Text>
    </View>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    width: 90,
    height: 50,
  },
  detail: {
    margin: 5,
  },
  darkText: {
    color: '#777777',
  },
})

export default ListPathItems;
