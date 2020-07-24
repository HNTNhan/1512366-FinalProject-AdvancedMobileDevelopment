import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, ActivityIndicator, TouchableOpacity, Slider} from 'react-native';
import {Video} from 'expo-av';
import WebView from "react-native-webview";
import CenterActivityIndicator from "../../Common/center-activity-indicator";
import {Button, Icon} from "react-native-elements";
import GoogleVideo from "./GoogleVideo/google-video";

const VideoPlayer = (props) => {
  //console.log(props.lesson)
  const uri = props.lesson.videoUrl || props.lesson.promoVidUrl;
  {
    if(props.videoLoading) {
      return <View style={{...styles.container}}>
        <CenterActivityIndicator />
      </View>
    } else {
      if(!uri) {
        return <View style={{...styles.container}}>
          <View>
            <Text style={{color: 'white'}}>Something went wrong!!!</Text>
          </View>
        </View>
      } else {
        if(uri.includes("https://youtube.com")) {
          return <View style={{...styles.container}}>
            <WebView
              source={{uri: uri}}
              style={{
                backgroundColor: '#111111',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width / 2
              }}
            />
          </View>
        } else {
          return <GoogleVideo uri={uri} navigation={props.navigation} route={props.route}/>
        }
      }
    }
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export default VideoPlayer;
