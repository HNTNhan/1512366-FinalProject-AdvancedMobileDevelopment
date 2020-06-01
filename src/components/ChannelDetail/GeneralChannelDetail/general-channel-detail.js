import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const GeneralChannelDetail = (props) => {
  return <View>
    <Text style={styles.title}>{props.detail.title}</Text>
    <Text style={styles.text}>{props.detail.user} . {props.detail.type} . {props.detail.member} member</Text>
  </View>
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  }
})
export default GeneralChannelDetail;
