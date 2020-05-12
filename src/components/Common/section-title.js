import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const SectionTitle = (props) => {
  return <View style={styles.title}>
    <Text style={styles.titleText}>{props.title}</Text>
    <TouchableOpacity style={styles.button}
                      onPress={props.onPress}>
      <Text style={styles.buttonText}> {props.button} </Text>
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginBottom: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 3,
    borderRadius: 10,
    marginRight: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
  },
})
export default SectionTitle;
