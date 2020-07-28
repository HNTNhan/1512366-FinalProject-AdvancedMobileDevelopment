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

const AddToChannelDialog = (props) => {
  const {state} = useContext(AuthenticationContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChannel, setNewChannel] = useState('');
  const [channels, setChannels] = useState([])
  const [channelsStorage, setChannelsStorage] = useState([])
  const [index, setIndex] = useState(-1)
  const [courseDetail, setCourseDetail] = useState()
  //const courseDetail = !props.courseDetail ? props.route.params.courseDetail : props.courseDetail;
  useEffect(() => {
    let temp = !props.courseDetail ? props.route.params.courseDetail : props.courseDetail
    delete temp['section']
    setCourseDetail(temp)
  }, [])

  useEffect(() => {
    getChannel().then(res =>{
      if(res.status===200) {
        if(res.data.length) {
          for(let i=0; i<res.data.length; i++) {
            if(res.data[i].id === state.userInfo.id) {
              setChannels(res.data[i].channels)
              setChannelsStorage(res.data)
              setIndex(i)
              return
            }
          }
          setChannels([])
          setChannelsStorage(res.data)
        } else {
          setChannels([])
          setChannelsStorage([])
        }
      } else {}
    }).catch(err => {
      alert(err.response.data.message || err)
      props.closeModel()
    })
  }, [])

  //console.log('channelsStorage: ', channelsStorage)
  //console.log(channels)

  const onPressModalItem = async (index) => {
    let tempChannels = [...channels]
    let tempChannelsStorage = [...channelsStorage]
    console.log(tempChannels)
    tempChannels[index].items.push(courseDetail)
    tempChannelsStorage[index].channels = tempChannels

    await storeChannel(tempChannelsStorage)
    setChannels(tempChannels)
    setChannelsStorage(tempChannelsStorage)
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

    let tempChannels = [...channels]
    let tempChannelsStorage = [...channelsStorage]
    tempChannels.push(channel)
    if(index!==-1) {
      tempChannelsStorage[index].channels = tempChannels
    } else {
      tempChannelsStorage.push({id: state.userInfo.id, channels: tempChannels})
    }
    await storeChannel(tempChannelsStorage)
    setChannels(tempChannels)
    setChannelsStorage(tempChannelsStorage)
    setNewChannel('');
    setModalVisible(false);
  }

  const ModalItem = (propsModal) => {
    const check = propsModal.channel.items.find(item => item.id===courseDetail.id);
    //const pos = user.channels.indexOf(channels.channel);

    return <TouchableOpacity
      style={{ ...styles.channelButton}}
      onPress={async () => { await onPressModalItem(propsModal.index)}}
      disabled={!!check}
    >
      <Icon name={!check ? 'cast-connected' : 'check'} size={18} />
      <Text style={styles.textStyle}>  {propsModal.channel.detail.title} {!check ? '' : '(added)'}</Text>
    </TouchableOpacity>
  }

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
                <Text style={styles.modalTitle}>Add to Channel</Text>

                <TouchableOpacity
                  style={{ ...styles.channelButton}}
                  onPress={() => {
                    props.closeModel()
                    setModalVisible(true)}}
                >
                  <Icon name={'plus'} type={"font-awesome-5"} size={14} />
                  <Text style={styles.textStyle}>  New channel</Text>
                </TouchableOpacity>

                {channels.map((channel, index) => <ModalItem key={channel+index} index={index} channel={channel}/>)}
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
              <Text style={styles.modalTitle}>Create channel</Text>
              <InputTextSae title='Channel title' value={newChannel} onChangeText={onChangeNewChannel}/>

              <View style={styles.createChannelButtonContainer}>
                <TouchableOpacity
                  style={styles.creatChannelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.creatChannelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.creatChannelButton}
                  onPress={() => {!channels.find(channel => channel.detail.title===newChannel) ? onPressSaveNewChannel() : null}}
                >
                  <Text style={styles.creatChannelButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

    </Modal>
  </View>
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
