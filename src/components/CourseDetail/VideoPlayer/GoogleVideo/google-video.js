import React, {useContext, useState, useRef, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {Video} from "expo-av";
import {Icon, Slider} from "react-native-elements";
import * as ScreenOrientation from 'expo-screen-orientation';
import {BottomTabBarContext} from "../../../../provider/bottom-tab-bar-provider";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import VolumeSlider from "../Components/volume-slider";
import {finishLesson, updateVideoTime} from "../../../../core/services/lesson-services";
import {LanguageContext} from "../../../../provider/language-provider";

const GoogleVideo = (props) => {
  const {setShow} = useContext(BottomTabBarContext)
  const {language} = useContext(LanguageContext)
  const [ref, setRef] = useState();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [paused, setPaused] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [videoStatus, setVideoStatus] = useState({
    currentTime: 0,
    duration: 0.1,
    overlay: false,
    rate: 1,
    volume: 1,
  })

  const showVideoInFullscreen = async () => {
    if(fullScreen) {
      setShow(true)
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    } else {
      setShow(false)
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    }
    setFullScreen(!fullScreen)
  }

  const getTime = (time) => {
    const t = time/1000;
    const digit = n => n < 10 ? `0${n}` : `${n}`;
    const sec = digit(Math.floor(t%60));
    const min = digit(Math.floor((t/60)%60));
    const hr = digit(Math.floor((t/3600)%60));
    return hr>0 ? hr + ':' + min + ':' + sec : min + ':' + sec;
  }

  const backward = () => {
    ref.getStatusAsync().then((status) => {
      if(!status.isBuffering) {
          ref.playFromPositionAsync(videoStatus.currentTime - 15000).then(() => {
            paused ? ref.pauseAsync() : ref.playAsync()
          })
      } else {
        paused ? ref.pauseAsync() : ref.playAsync()
      }
    })
  }

  const forward = () => {
    ref.getStatusAsync().then((status) => {
      if(!status.isBuffering) {
          ref.playFromPositionAsync(videoStatus.currentTime + 15000).then(() => {
            paused ? ref.pauseAsync() : ref.playAsync()
          })
      } else {
        paused ? ref.pauseAsync() : ref.playAsync()
      }
    })
  }

  const onSlide = (slide) => {
    ref.getStatusAsync().then((status) => {
      if(!status.isBuffering) {
        ref.playFromPositionAsync(videoStatus.duration * slide).then(() => {
          paused ? ref.pauseAsync() : ref.playAsync()
        })
      } else {
        onSlide(slide)
      }
    })
  }

  const next = () => {
    props.onPressNextBack(true)
  }

  const back = () => {
    props.onPressNextBack(false)
  }

  const changeRate = (rate) => {
    ref.setRateAsync(rate, true).then(() => {
      setVideoStatus({...videoStatus, rate: rate})
    })
  }

  const onLoad = (status) => {
    if(props.pos) {
      Alert.alert('', language.courseDetail.video.continue,
        [
          {
            text: language.same.buttonCancel,
            onPress: () => setVideoStatus({...videoStatus, duration: status.durationMillis}),
            style: "cancel"
          },
          { text: language.same.buttonOK, onPress: () => ref.setPositionAsync(props.pos*1000*60).then(() => {
              setVideoStatus({...videoStatus, duration: status.durationMillis})
            }) }
        ],
      )
    } else {
      setVideoStatus({...videoStatus, duration: status.durationMillis})
    }
  }

  const onPlaybackStatusUpdate = (status) => {
    if(status.didJustFinish) {
      if(props.id) {
        finishLesson(props.id, props.token).then((res) => {

        }).catch(err => {
          alert(err.response.data.message)
        })
      } else {}
    } else {
      if(videoStatus.duration!==0.1) {
        setVideoStatus({...videoStatus, currentTime: status.positionMillis})
        if(status.positionMillis%5000<500 && status.positionMillis>3000) {
          if(props.id) {
            updateVideoTime(status.positionMillis/1000/60, props.id, props.token).then((res) => {})
          } else {}
        } else {}
      } else {}
    }
  }

  return <View style={fullScreen ? styles.fullScreenContainer : styles.container}>
      <Video
        source={{uri: props.uri}}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={"contain"}
        shouldPlay={false}
        isLooping={false}
        inFullscreen={true}
        //positionMillis={5000}
        useNativeControls={false}
        // showControlsOnLoad={true}
        // progressUpdateIntervalMillis={500}
        //onLoadStart={() => console.log('onLoadStart')}
        //onLoadStart={() => setVideoRef(ref)}
        onLoad={(status) => onLoad(status)}
        onError={(err) => alert(err)}
        onPlaybackStatusUpdate={(status) => onPlaybackStatusUpdate(status)}
        ref={component => setRef(component)}
        style={{
          backgroundColor: '#111111',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').width / 1.9
        }}
      />
    <View style={styles.subContainer}>
      {
        videoStatus.overlay ? <TouchableOpacity style={{...styles.overlay}} onPress={() => setVideoStatus({...videoStatus, overlay: false})}>
          <View style={{...styles.overlaySet, opacity: 0.5, backgroundColor: 'black'}}>
          </View>
          <View style={{...styles.overlaySet}} >
            <View style={{...styles.overlaySet}}>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>{props.name}</Text>
            </View>
            <View style={{...styles.iconContainer}}>
              {
                props.checkOwn && props.checkBack ?
                  <Icon name={'step-backward'} containerStyle={{...styles.icon}} iconStyle={{padding: 10}} size={20}
                        type={"font-awesome-5"} color='white' onPress={() => back()}/> : <View/>
              }
              <Icon name={'backward'} containerStyle={{...styles.icon}} iconStyle={{padding: 10}} size={20} type={"font-awesome-5"} color='white'
                    onPress={() => {
                      ref.pauseAsync().then(() => backward())
                    }} />
              <Icon name={paused ? 'play' : 'pause'} containerStyle={styles.icon} iconStyle={{padding: 10}} size={20} type={"font-awesome-5"} color='white'
                    onPress={() => {
                      paused ? ref.playAsync().then(() => setPaused(!paused)) :  ref.pauseAsync().then(() => setPaused(!paused))
                    }} />
              <Icon name={'forward'} type={"font-awesome-5"} containerStyle={styles.icon} iconStyle={{padding: 10}} size={20} color='white'
                    onPress={() => {
                      ref.pauseAsync().then(() => forward())
                    }} />
              {
                props.checkOwn && props.checkNext ?
                  <Icon name={'step-forward'} type={"font-awesome-5"} containerStyle={styles.icon}
                        iconStyle={{padding: 10}} size={20} color='white' onPress={() => next()}/> : <View/>
              }
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.timer}>
                <Text style={{color: 'white'}}>{getTime(videoStatus.currentTime)} / {getTime(videoStatus.duration)}</Text>
                <View style={styles.otherFunction}>
                  <Icon name={videoStatus.volume===0 ? 'volume-off' : 'volume-up'} containerStyle={{zIndex: 1}} iconStyle={{paddingVertical: 13, paddingHorizontal: 5}}
                        type={"font-awesome-5"} size={18} color='white'
                        onPress={() => setShowVolumeSlider(!showVolumeSlider)} />
                  {
                    showVolumeSlider ? <VolumeSlider value={videoStatus.volume}
                                                     onChange={(value) => {
                                                       ref.setVolumeAsync(value).then(() => setVideoStatus({...videoStatus, volume: value}))
                                                     }}/> : null
                  }
                  <Menu style={styles.dropdown}>
                    <MenuTrigger customStyles={{triggerWrapper: {padding: 10,}}}>
                      <Text style={{color: 'white', fontSize: 18}}>{videoStatus.rate}x</Text>
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles}>
                      <MenuOption onSelect={() => changeRate(0.25)} text={'0.25x'} />
                      <MenuOption onSelect={() => changeRate(0.5)} text={'0.5x'} />
                      <MenuOption onSelect={() => changeRate(0.75)} text={'0.75x'} />
                      <MenuOption onSelect={() => changeRate(1)} text={'1x'} />
                      <MenuOption onSelect={() => changeRate(1.25)} text={'1.25x'} />
                      <MenuOption onSelect={() => changeRate(1.5)} text={'1.5x'} />
                      <MenuOption onSelect={() => changeRate(2)} text={'2x'} />
                    </MenuOptions>
                  </Menu>
                  <Icon name={fullScreen ? 'compress' : 'expand'} containerStyle={{zIndex: 1}} iconStyle={{padding: 13}} type={"font-awesome-5"} size={18} color='white' onPress={() => showVideoInFullscreen()} />
                </View>
              </View>

              <Slider
                style={{marginHorizontal: 15}}
                thumbStyle={{height: 15, width: 15}}
                trackStyle={{height: 3}}
                maximumTrackTintColor={'white'}
                minimumTrackTintColor={'white'}
                thumbTintColor={'white'}
                value={videoStatus.currentTime/videoStatus.duration || 0}
                onSlidingStart={async () => {await ref.pauseAsync()}}
                onValueChange={(value) => {
                  setVideoStatus({...videoStatus, currentTime: value*videoStatus.duration})
                }}
                onSlidingComplete={(value) => {
                  ref.pauseAsync().then(() => onSlide(value))
                }}
              />
            </View>
          </View>

        </TouchableOpacity> : <TouchableOpacity style={{...styles.overlay}} onPress={() => setVideoStatus({...videoStatus, overlay: true})}>
          <View style={{flex: 1}}>
          </View>
        </TouchableOpacity>
      }
    </View>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  fullScreenContainer: {
    flex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',

  },
  subContainer: {
    position: "absolute",
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%'
  },
  overlay: {
    flex: 1,
  },
  overlaySet: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  icon: {
    borderRadius: 50,
    zIndex: 1,
  },
  sliderContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  timer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: -20
  },
  otherFunction: {
    flexDirection: 'row',
    zIndex: 1,
  },
  dropdown: {

  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#444444',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsWrapper: {

  },
  optionWrapper: {
    margin: 5,
    textAlign: 'center'
  },
  optionText: {
    color: 'white',
    fontSize: 18
  },
};

export default GoogleVideo;
