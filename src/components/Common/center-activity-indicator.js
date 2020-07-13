import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const CenterActivityIndicator = (props) => {
  return <View style={styles.container}>
    <ActivityIndicator size={'large'} color={'blue'}/>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default CenterActivityIndicator;
