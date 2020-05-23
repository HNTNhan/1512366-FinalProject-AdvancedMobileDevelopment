import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

const ButtonSetting = (props) => {
  return <TouchableOpacity
            style={styles.itemContainer}
            onPress={props.onPress}
  >
    <Text style={styles.text}>{props.title}</Text>
    <Image source={require('../../../../assets/ic_next.png')} style={styles.image}/>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gainsboro',
    paddingVertical: 10,
  },
  image: {
    width: 30,
    height: 30,
    opacity: 0.3,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  }
})

export default ButtonSetting;
