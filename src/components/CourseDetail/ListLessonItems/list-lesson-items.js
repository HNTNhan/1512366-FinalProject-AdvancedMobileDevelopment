import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";
import {getLessonDetail, getLessonSubtitle, getLessonUrlAndTime} from "../../../core/services/lesson-services";
import {AuthenticationContext} from "../../../provider/authentication-provider";

const ListLessonItems = (props) => {
  const {theme} = useContext(ColorsContext)
  const {state} = useContext(AuthenticationContext)

  const lesson = props.item;

  const onPress = () => {
    props.videoLoading()
    if(props.downloaded) {
      const data = {
        videoUrl: lesson.videoUrl,
      }
      props.onPress(data)
    } else {
      let temp = null;
      if(props.checkOwn || lesson.isPreview) {
        Promise.all([getLessonDetail(props.courseId, lesson.id, state.token), getLessonSubtitle(props.courseId, lesson.id, state.token), getLessonUrlAndTime(props.courseId, lesson.id, state.token)])
          .then(res => {
            temp = {...res[0].data.payload, subtitle: res[1].data.payload, ...res[2].data.payload}
            props.onPress(temp)
          }).catch(err => {
          if(err.response && err.response.status===400) {
            const data = {
              videoUrl: lesson.videoUrl,
              currentTime: null,
              isFinish: null
            }
            //temp = {...temp, data}
            props.onPress(data)
          }
          else {
            console.log('fail1: ', err.response.data.message, err.response.status)
          }
        })
      } else {
        props.showInfoDialog()
        console.log(props.checkOwn, lesson.isPreview)
      }
    }
  }

  if(props.type==='lesson') {
    return <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <View style={{...styles.titleContainer}}>
        <Icon name={lesson.isFinish ? 'check-circle' : props.checkOwn ? 'circle' : lesson.isPreview ? 'circle' : 'lock'} type='font-awesome-5'
              size={12} style={{marginRight: 5}} color={lesson.isFinish ? 'green' : theme.text} solid={false}/>
        <Text style={{flexShrink: 1, color: theme.text}}>{lesson.name}</Text>
      </View>

      <Text style={{...styles.text, color: theme.text}}>{Math.floor((lesson.hours) * 60)}m</Text>
    </TouchableOpacity>
  } else {
    return <TouchableOpacity style={styles.container} onPress={() => props.onPress(props.item)}>
      <View style={{...styles.titleContainer}}>
        <Text style={{flexShrink: 1, marginLeft: 15, color: theme.text}}>Course Overview</Text>
      </View>
    </TouchableOpacity>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  titleContainer: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'right'
  }
})
export default ListLessonItems;
