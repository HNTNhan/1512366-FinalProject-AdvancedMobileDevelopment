import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, ActivityIndicator, TouchableOpacity, Slider} from 'react-native';
import CenterActivityIndicator from "../../Common/center-activity-indicator";
import Video from "expo-av/build/Video";
import GoogleVideo from "./GoogleVideo/google-video";
import YoutubeVideo from "./YoutubeVideo/youtube-video";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {getLessonDetail, getLessonSubtitle, getLessonUrlAndTime} from "../../../core/services/lesson-services";

const VideoPlayer = (props) => {
  const {state} = useContext(AuthenticationContext)

  const onPress = (next) => {
    props.setVideoLoading()
    let temp = null;
    let lessonId = '';
    if(next) {
      lessonId = props.lesson.nextLessonId;
    } else {
      lessonId = props.lesson.prevLessonId;
    }
    if(props.checkOwn && props.lesson.nextLessonId) {
      Promise.all([
        getLessonDetail(props.courseId, lessonId, state.token),
        getLessonSubtitle(props.courseId, lessonId, state.token),
        getLessonUrlAndTime(props.courseId, lessonId, state.token)
      ])
        .then(res => {
          temp = {...res[0].data.payload, subtitle: res[1].data.payload, ...res[2].data.payload}
          props.onPressLesson(temp)
        }).catch(err => {
          alert(err.response.data.message || err)
        })
    } else {}
  }

  {
    if(props.videoLoading || !props.lesson) {
      return <View style={{...styles.container}}>
        <CenterActivityIndicator backgroundColor={'black'} />
      </View>
    } else {
      const uri = props.lesson.videoUrl || props.lesson.promoVidUrl;
      if(!uri) {
        return <View style={{...styles.container}}>
          <View>
            <Text style={{color: 'white'}}>Something went wrong!!!</Text>
          </View>
        </View>
      } else {
        if(uri.includes("https://youtube.com")) {
          return <YoutubeVideo uri={uri} id={props.lesson.id || null} token={state.token} pos={props.lesson.currentTime || 0}
                               checkOwn={props.checkOwn} onPressNextBack={onPress}
                               checkNext={props.lesson.nextLessonId} checkBack={props.lesson.prevLessonId}
          />
        } else {
          return <GoogleVideo uri={uri} id={props.lesson.id || null} token={state.token} pos={props.lesson.currentTime || 0}
                              checkOwn={props.checkOwn} onPressNextBack={onPress} local={props.lesson.local || null}
                              checkNext={props.lesson.nextLessonId} checkBack={props.lesson.prevLessonId} name={props.lesson.name}
          />
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
