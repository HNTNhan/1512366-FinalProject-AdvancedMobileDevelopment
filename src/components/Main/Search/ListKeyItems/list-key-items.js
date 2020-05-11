import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const ListKeyItems = (props) => {
  return <View>
    <TouchableOpacity style={styles.keyContainer} onPress={() => console.log(props.item.key)}>
      <Image source={require('../../../../../assets/ic_search.png')} style={styles.image}/>
      <Text style={styles.keyText}>{props.item.key}</Text>
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  keyContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  image: {
    marginRight: 5,
    width: 25,
    height: 25,
  },
  keyText: {
    fontSize: 18,
  },
})
export default ListKeyItems;
