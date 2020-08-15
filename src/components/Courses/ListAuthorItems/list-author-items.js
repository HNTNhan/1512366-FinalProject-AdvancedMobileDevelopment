import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";

const ListAuthorItems = (props) => {
  const {theme} = useContext(ColorsContext);

  return <TouchableOpacity style={styles.item} onPress={props.onPress}>
    <Image source={{uri: props.item.avatar}} style={styles.image}/>
    <View style={styles.detail}>
      <Text style={{fontSize: 16, color: theme.text}}>{props.item.name}</Text>
      <Text style={styles.darkText}>{props.item.numcourses} {props.item.numcourses > 1 ? props.language.search.courses : props.language.search.course}</Text>
    </View>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  detail: {
    margin: 5,
  },
  darkText: {
    color: 'darkgray',
  },
})
export default ListAuthorItems;
