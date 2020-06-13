import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";

const ListAuthorItems = (props) => {
  const {theme} = useContext(ColorsContext);

  return <TouchableOpacity style={styles.item} onPress={props.onPress}>
    <Image source={require('../../../../assets/ic_person.png')} style={styles.image}/>
    <View style={styles.detail}>
      <Text style={{fontSize: 16, color: theme.text}}>{props.item.detail.name}</Text>
      <Text style={styles.darkText}>{props.item.courses.length} Courses</Text>
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
