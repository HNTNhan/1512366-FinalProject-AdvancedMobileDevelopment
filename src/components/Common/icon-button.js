import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Text} from 'react-native-elements'
import {ColorsContext} from "../../provider/colors-provider";

const IconButton = (props) => {
  const {theme} = useContext(ColorsContext)
  return <TouchableOpacity style={styles.container}>
    <Icon name={props.name} size={30} style={styles.icon} color={theme.text}/>
    <Text style={{color: theme.text, fontSize: 16}}>{props.title}</Text>
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
    borderColor: '#777777'
  },
})
export default IconButton;
