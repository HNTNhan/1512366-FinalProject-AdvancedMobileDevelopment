import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Icon} from "react-native-elements";
import {ColorsContext} from "../../../../provider/colors-provider";

const ListKeyItems = (props) => {
  const {theme} = useContext(ColorsContext);

  return <View>
    <TouchableOpacity style={styles.keyContainer} onPress={props.onPress}>
      <Icon name={'search'} type='font-awesome-5' color={theme.text} size={18} containerStyle={styles.image}/>
      <Text style={{...styles.keyText, color: theme.text}}>{props.type===0 ? props.item.content : props.item.name}</Text>
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
  },
  keyText: {
    fontSize: 18,
  },
})
export default ListKeyItems;
