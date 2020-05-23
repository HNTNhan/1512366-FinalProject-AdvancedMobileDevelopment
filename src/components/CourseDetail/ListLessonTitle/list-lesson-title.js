import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Icon, Text} from "react-native-elements";

const ListLessonTitle = (props) => {
  return <View style={styles.container}>
    <View style={styles.subContainer}>
      <Text style={styles.thumbnail}>{props.index}</Text>
      <View style={{flex: 0.7, paddingHorizontal: 5}}>
        <Text style={{fontSize: 16}}>{props.title}</Text>
        <Text>{props.totalDuration}</Text>
      </View>
    </View>

    <Button type='clear' icon={<Icon name='ellipsis-v' type='font-awesome-5' size={20}/>}/>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  subContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  thumbnail: {
    flex: 0.3,
    backgroundColor: 'gray',
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 18,
  },
})
export default ListLessonTitle;
