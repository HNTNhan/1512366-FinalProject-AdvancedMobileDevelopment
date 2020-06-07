import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SectionTitleFilter = (props) => {
  return <View style={styles.title}>
    <Text style={styles.titleText}>{props.title}</Text>
    <TouchableOpacity style={styles.button}
                      onPress={props.onPressFilterLevel}>
      <Text style={styles.buttonText}> {props.filterText1} </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}
                      onPress={props.onPressFilterTime}>
      <Text style={styles.buttonText}> {props.filterText2} </Text>
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
    marginRight: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
  },
})
export default SectionTitleFilter;
