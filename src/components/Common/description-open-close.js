import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Icon, Text} from "react-native-elements";

const DescriptionOpenClose = (props) => {
  const [icon, setIcon] = useState(false);
  const [line, setLine] = useState(false)

  return <View style={styles.container}>
    <Text numberOfLines={line ? 1000 : props.noLines} style={styles.text}>{props.description}</Text>
    <TouchableOpacity style={styles.button} onPress={() => {
      setIcon(!icon)
      setLine(!line)
    }}>
      <Icon name={icon ? 'arrow-drop-down' : 'arrow-drop-down'}/>
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    flex: 0.9,
  },
  button: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default DescriptionOpenClose;
