import React, {useState} from 'react';
import {Slider} from "react-native-elements";

const VolumeSlider = (props) => {

  return <Slider
    style={{width: 100, marginTop: 3}}
    thumbStyle={{height: 15, width: 15}}
    trackStyle={{height: 3,}}
    maximumTrackTintColor={'white'}
    minimumTrackTintColor={'white'}
    thumbTintColor={'white'}
    value={props.value}
    onSlidingComplete={(value) => {
      props.onChange(value)
    }}
  />
};

export default VolumeSlider;
