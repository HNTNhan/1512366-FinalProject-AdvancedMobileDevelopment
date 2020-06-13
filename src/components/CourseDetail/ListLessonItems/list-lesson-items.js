import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";

const ListLessonItems = (props) => {
  const {theme} = useContext(ColorsContext)

  return <TouchableOpacity style={styles.container}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon name='circle' type='font-awesome-5' size={11} style={{marginRight: 5}} color={theme.text}/>
      <Text style={{color: theme.text}}>{props.item.name}</Text>
    </View>

    <Text style={{color: theme.text}}>{props.item.duration}</Text>
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
