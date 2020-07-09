import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";

const ListLessonItems = (props) => {
  const {theme} = useContext(ColorsContext)
  const lesson = props.item;

  if(props.type==='lesson') {
    return <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={{...styles.titleContainer}}>
        <Icon name='circle' type='font-awesome-5' size={11} style={{marginRight: 5}} color={theme.text}/>
        <Text style={{flexShrink: 1, color: theme.text}}>{lesson.name}</Text>
      </View>

      <Text style={{...styles.text, color: theme.text}}>{Math.floor((lesson.hours) * 60)}m</Text>
    </TouchableOpacity>
  } else {
    return <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={{...styles.titleContainer}}>
        <Text style={{flexShrink: 1, marginLeft: 15, color: theme.text}}>Course Overview</Text>
      </View>
    </TouchableOpacity>
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  titleContainer: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'right'
  }
})
export default ListLessonItems;
