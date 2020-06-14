import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";
import {Icon} from "react-native-elements";

const ButtonSetting = (props) => {
  const {theme} = useContext(ColorsContext);

  return <TouchableOpacity
            style={styles.itemContainer}
            onPress={props.onPress}
  >
    <Text style={{...styles.text, color: theme.text}}>{props.title}</Text>
    <Icon style={{paddingTop: 3}} name={'chevron-right'} type={"font-awesome-5"} size={16} color={theme.text} />
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
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
