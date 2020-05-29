import React from 'react';
import {View} from 'react-native';
import {Icon} from "react-native-elements";

const IconMainHeaderRight = (props) => {
  return <Icon name='ellipsis-v'
               size={20}
               type='font-awesome-5'
               containerStyle={{marginRight: 10, paddingHorizontal: 10}}
               onPress={props.onPress}
  />
};

export default IconMainHeaderRight;
