import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Text} from 'react-native-elements'

const IconButton = (props) => {
  return <TouchableOpacity style={styles.container}>
    <Icon name={props.name} size={30} style={styles.icon}/>
    <Text>{props.title}</Text>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignSelf: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  icon: {
    alignSelf: 'flex-start',
    borderRadius: 50,
    borderWidth: 1,
    padding: 5,
  },
})
export default IconButton;
