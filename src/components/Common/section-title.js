import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const SectionTitle = (props) => {
  return <View style={styles.title}>
    <Text style={styles.titleText}>{props.title}</Text>
    <TouchableOpacity style={styles.button}
                      onPress={props.onPress}>
      <Text style={styles.buttonText}> {props.buttonText} </Text>
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
    marginTop: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 3,
    borderRadius: 10,
    marginRight: 0,
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
})
export default SectionTitle;
