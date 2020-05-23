import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import { Video } from 'expo-av';
//import { WebView } from 'react-native-webview';

const VideoPlayer = (props) => {
  return <View style={styles.container}>
    <Video
      source={require('../../../../assets/SecureCodingSkillsPreventingBrokenAccessControlCoursePreview.mp4')}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode={Video.RESIZE_MODE_CONTAIN }
      //shouldPlay
      //isLooping
      useNativeControls
      style={{backgroundColor: 'black', width: Dimensions.get('window').width, height: Dimensions.get('window').width/1.7}}
    />
  </View>
  // <WebView
  //   source={{ uri: 'https://www.youtube.com/embed/y31s-AFwL28' }}
  //   style={styles.video}
  // />

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
});

export default VideoPlayer;
