import React, {useState, useRef, useEffect, useContext} from 'react';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Icon} from "react-native-elements";
import {finishLesson, updateVideoTime} from "../../../../core/services/lesson-services";
import CenterActivityIndicator from "../../../Common/center-activity-indicator";
import {LanguageContext} from "../../../../provider/language-provider";


const YoutubeVideo = (props) => {
  const {language} = useContext(LanguageContext)
  const playerRef = useRef(null);
  const [buffering, setBuffering] = useState(false);
  const [pos, setPos] = useState(Math.floor(props.pos*60));
  const [overlay, setOverlay] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if(time!==0) {
        if(!overlay) {
          if(playerRef) {
            playerRef.current.getCurrentTime().then(currentTime => {
              if(time-currentTime<=-4 || time-currentTime>0) {
                if(props.id) {
                  updateVideoTime(currentTime/60, props.id, props.token)
                    .then()
                    .catch()
                } else {}
              } else {}
              setTime(currentTime)
            })
          } else {}
        } else {}
      } else {}
    }, 5000);
    return () => clearInterval(interval);
  }, [time])

  const next = () => {
    props.onPressNextBack(true)
  }

  const back = () => {
    props.onPressNextBack(false)
  }

  const onReady = () => {
    if(pos) {
      Alert.alert('', language.courseDetail.video.continue,
        [
          {
            text: language.same.buttonCancel,
            onPress: () => {
              setPos(0)
              setTime(0)
            },
            style: "cancel"
          },
          { text: language.same.buttonOK, onPress: () => {setTime(pos)}}
        ],
      )
    } else {
      setTime(0)
    }
  }

  const onChangeState = (event) => {
    switch (event) {
      case 'playing':
        setOverlay(false)
        setBuffering(false)
        break;
      case 'paused':
        setOverlay(true)
        setBuffering(false)
        break;
      case 'ended':
        if(props.id) {
          finishLesson(props.id, props.token).then((res) => {
            setOverlay(true)
          }).catch(err => {
            alert(err.response.data.message || err)
          })
        } else {
          setOverlay(true)
        }
        setBuffering(false)
        break;
      case 'buffering':
        setOverlay(false)
        setBuffering(true)
        break;
      default:
        setBuffering(false)
    }
  }

  return <View style={{...styles.container}}>
    <YoutubePlayer
      ref={playerRef}
      height={Dimensions.get('window').width / 1.9}
      width={Dimensions.get('window').width}
      videoId={props.videoId}
      play={false}
      onChangeState={event => onChangeState(event)}
      onReady={() => onReady()}
      onError={e => alert(e)}
      onPlaybackQualityChange={q => console.log('quality', q)}
      volume={100}
      playbackRate={1}
      initialPlayerParams={{
        start: pos,
        rel: 0,
      }}
    />
    {
      overlay ? <View style={{...styles.overlay}}>
        {
          props.checkOwn ? <View style={styles.overlaySet}>
            {
              props.checkBack ? <Icon name={'step-backward'} containerStyle={{...styles.icon}} iconStyle={{padding: 10, opacity: 1000}}
                   size={20} type={"font-awesome-5"} color='black' onPress={() => back()}/> : <View/>
            }
            {
              props.checkNext ? <Icon name={'step-forward'} type={"font-awesome-5"} containerStyle={styles.icon} iconStyle={{padding: 10}}
                   size={20} color='black' onPress={() => next()}/> : <View/>
            }
          </View> : null
        }
      </View> : null
    }
    {
      buffering ?
        <View style={{...styles.overlay}}>
          <CenterActivityIndicator backgroundColor={'transparent'}/>
        </View> : null
    }
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  videoStyle: {
    backgroundColor: '#111111',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 1.9
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    marginBottom: 10
  }
});



export default YoutubeVideo;
