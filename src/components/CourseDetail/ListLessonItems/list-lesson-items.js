import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from "react-native-elements";

const ListLessonItems = (props) => {

  return <TouchableOpacity style={styles.container}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon name='circle' type='font-awesome-5' size={11} style={{marginRight: 5}}/>
      <Text>{props.item.name}</Text>
    </View>

    <Text>{props.item.duration}</Text>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  }
})
export default ListLessonItems;
