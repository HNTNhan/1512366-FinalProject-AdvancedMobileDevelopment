import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";

const ChannelProgress = (props) => {
  const {theme} = useContext(ColorsContext)

  return <View style={styles.container}>
    <Text style={{...styles.title, color: theme.text}}>Your Progress: {props.progress.toFixed(2)}%</Text>
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
    marginTop: 5
  }
})
export default ChannelProgress;
