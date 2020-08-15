import React, {useContext, useEffect, useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert, ScrollView
} from 'react-native';
import {Icon, Text} from "react-native-elements";
import {AuthenticationContext} from "../../provider/authentication-provider";
import InputTextSae from "./input-text-sae";
import {getChannel, storeChannel} from "../../core/local_storage/channel-storage";
import {UserContext} from "../../provider/user-provider";
import {getCourseInfo, getCourseProcess} from "../../core/services/course-services";
import {checkOwnCourse} from "../../core/services/user-services";
import {LanguageContext} from "../../provider/language-provider";

const AddToChannelDialog = (props) => {
  const {state} = useContext(AuthenticationContext);
  const userContext = useContext(UserContext);
  const {language} = useContext(LanguageContext)

  const [modalVisible, setModalVisible] = useState(false);
  const [newChannel, setNewChannel] = useState('');
  const [channelsStorageData, setChannelStorageData] = useState({data: [], index: -1})
  const [courseDetail, setCourseDetail] = useState();
  const [isLoading, setIsLoading] = useState({...props.modalVisible});

  useEffect(() => {
    if(state.isAuthenticated) {
      Promise.all([getCourseInfo(props.courseDetail.id, state.token), checkOwnCourse(state.token, props.courseDetail.id)])
        .then(res => {
          if(res[0].data.payload.isUserOwnCourse) {
            getCourseProcess(props.courseDetail.id, state.token).then(progress => {
              res[0].data.payload.instructorName = props.courseDetail.instructorName || props.courseDetail['instructor.user.name'] || props.courseDetail.name
              res[0].data.payload.process = progress.data.payload
              setCourseDetail(res[0].data.payload)
            }).catch(err => {
              res[0].data.payload.instructorName = props.courseDetail.instructorName || props.courseDetail['instructor.user.name'] || props.courseDetail.name
              res[0].data.payload.process = 0
              setCourseDetail(res[0].data.payload)
            })
          } else {
            res[0].data.payload.instructorName = props.courseDetail.instructorName || props.courseDetail['instructor.user.name'] || props.courseDetail.name
            res[0].data.payload.process = 0
            setCourseDetail(res[0].data.payload)
          }
        }).catch(err => {
        alert(err.response.data.message || err)
      })
    } else {}
    // let temp = {...props.courseDetail}
    // delete temp['section']
    // setCourseDetail(temp)
  }, [])

  useEffect(() => {
    if(props.modalVisible) {
      getChannel().then(res =>{
        if(res.status===200) {
          if(res.data.length) {
            let check = false
            for(let i=0; i<res.data.length; i++) {
              if(res.data[i].id === state.userInfo.id) {
                check = true
                setChannelStorageData({data: res.data, index: i})
              }
            }
            if(!check) {
              setChannelStorageData({data: res.data, index: -1})
            } else {}
          } else {
            setChannelStorageData({data: [], index: -1})
          }
        } else {
          //console.log('err: ', res.data.e)
        }
        setIsLoading(false)
      }).catch(err => {
        alert(err.response.data.message || err)
        props.closeModel()
      })
    } else {}
  }, [props.modalVisible])

  const onPressModalItem = async (channelIndex) => { // index = pos channel in channels array
    let tempChannels = [...channelsStorageData.data[channelsStorageData.index].channels]
    let tempChannelsStorage = [...channelsStorageData.data]

    tempChannels[channelIndex].items.push(courseDetail)
    tempChannelsStorage[channelsStorageData.index].channels = tempChannels

    await storeChannel(tempChannelsStorage)
    setChannelStorageData({...channelsStorageData, data: tempChannelsStorage})
    userContext.requestUpdateChannel()
    props.closeModel();
  }

  const onChangeNewChannel = (newChannel) => {
    setNewChannel(newChannel)
  }

  const onPressSaveNewChannel = async () => {
    const channel = {
      detail: {
        title: newChannel,
      },
      items: [courseDetail]
    };

    let tempChannels = channelsStorageData.index!==-1 ? [...channelsStorageData.data[channelsStorageData.index].channels] : []
    let tempChannelsStorage = [...channelsStorageData.data]
    tempChannels.push(channel)

    if(channelsStorageData.index!==-1) {
      tempChannelsStorage[channelsStorageData.index].channels = tempChannels
    } else {
      tempChannelsStorage.push({id: state.userInfo.id, channels: tempChannels})
    }

    await storeChannel(tempChannelsStorage)
    setChannelStorageData({data: tempChannelsStorage, index: tempChannelsStorage.length-1})
    setNewChannel('');
    userContext.requestUpdateChannel()
    setModalVisible(false);
  }

  const ModalItem = (propsModal) => {
    const check = propsModal.channel.items.find(item => item.id===courseDetail.id);

    return <TouchableOpacity
      style={{ ...styles.channelButton}}
      onPress={async () => { await onPressModalItem(propsModal.index)}}
      disabled={!!check}
    >
      <Icon name={!check ? 'cast-connected' : 'check'} size={18} />
      <Text style={styles.textStyle}>  {propsModal.channel.detail.title} {!check ? '' : language.channelDialog.added}</Text>
    </TouchableOpacity>
  }

  if(isLoading) {
    return <View/>
  } else {
    return <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={props.closeModel}>
        <TouchableWithoutFeedback onPress={props.closeModel}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={null}>
              <View style={styles.modalView}>
                <ScrollView>
                  <Text style={styles.modalTitle}>{language.channelDialog.addChannel}</Text>

                  <TouchableOpacity
                    style={{ ...styles.channelButton}}
                    onPress={() => {
                      props.closeModel()
                      setModalVisible(true)}}
                  >
                    <Icon name={'plus'} type={"font-awesome-5"} size={14} />
                    <Text style={styles.textStyle}>{language.channelDialog.buttonNewChannel}</Text>
                  </TouchableOpacity>
                  {
                    channelsStorageData.index!==-1 ?
                      channelsStorageData.data[channelsStorageData.index].channels.map(
                        (channel, index) => <ModalItem key={channel+index} index={index} channel={channel}/>)
                      : null
                  }
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType="fade"
             transparent={true}
             visible={modalVisible}
             onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={null}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{language.channelDialog.createChannel}</Text>
                <InputTextSae title={language.channelDialog.channelTitle} value={newChannel} onChangeText={onChangeNewChannel}/>

                <View style={styles.createChannelButtonContainer}>
                  <TouchableOpacity
                    style={styles.creatChannelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.creatChannelButtonText}>{language.same.buttonCancel}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.creatChannelButton}
                    onPress={() => {
                      channelsStorageData.index===-1 || !channelsStorageData.data[channelsStorageData.index].channels.find(
                        channel => channel.detail.title===newChannel) ? onPressSaveNewChannel() : null}
                    }
                  >
                    <Text style={styles.creatChannelButtonText}>{language.same.buttonSave}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>

      </Modal>
    </View>
  }
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: "#eeeeee",
    padding: 20,
    width: '80%',
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  channelButton: {
    flexDirection: 'row',
    padding: 10,
  },
  creatChannelButton: {
    marginLeft: 10,
    padding: 5,
  },
  creatChannelButtonText: {
    fontSize: 16,
    color: '#03A9F4',
  },
  textStyle: {
    fontSize: 16,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  createChannelButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  }
});

export default AddToChannelDialog;
