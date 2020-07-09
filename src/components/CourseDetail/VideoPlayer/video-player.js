import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text, ActivityIndicator} from 'react-native';
import { Video } from 'expo-av';
import WebView from "react-native-webview";
//import { WebView } from 'react-native-webview';

const VideoPlayer = (props) => {
  if(!props.lesson) {
    return <View style={{...styles.container}}>
      <ActivityIndicator size="large" color="#0000ff"/>
    </View>
  } else {
    const uri = props.lesson.videoUrl || props.lesson.promoVidUrl;
    return <View style={{...styles.container}}>
      {
        uri===null ? <Text>Some thing wrong!!!</Text> :
          uri.includes("https://youtube.com") ?
            <WebView
              source={{uri: uri}}
              style={{
                backgroundColor: 'black',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width / 1.7
              }}
            /> :
            <Video
              source={{uri: uri}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={Video.RESIZE_MODE_CONTAIN}
              //shouldPlay
              //isLooping
              useNativeControls
              style={{
                backgroundColor: 'black',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width / 1.7
              }}
            />
      }
    </View>
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    alignItems: 'center',
  },
});

export default VideoPlayer;
