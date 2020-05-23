import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ChannelProgress = (props) => {
  return <View style={styles.container}>
    <Text style={styles.title}>Your Progress: {props.progress}%</Text>
    <View style={styles.progressBar}>
      <View style={{height: 5, backgroundColor: '#2ECC71', width: props.progress*2}}/>
    </View>
  </View>
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
  },
  progressBar: {
    width: 200,
    height: 5,
    backgroundColor: '#BDC3C7',
  }
})
export default ChannelProgress;
