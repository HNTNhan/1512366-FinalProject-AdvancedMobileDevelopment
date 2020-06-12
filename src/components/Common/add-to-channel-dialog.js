import React, {useContext, useState} from 'react';
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

const AddToChannelDialog = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newChannel, setNewChannel] = useState('');
  const {user, setUser} = useContext(AuthenticationContext)

  const onPressModalItem = (pos, title) => {
    let temp = {...user}
    temp.channels[pos].items.push({typeItem: 'path', data: [props.route.params.key],});
    props.closeModel();
  }

  const onChangeNewChannel = (newChannel) => {
    setNewChannel(newChannel)
  }

  const onPressSaveNewChannel = () => {
    const channel = {
      detail: {
        title: newChannel,
        user: user.name,
        type: 'Private',
        member: 1,
      },
      progress: 0,
      items: [
        {
          typeItem: 'path',
          data: [props.route.params.key],
        },
      ]
    };
    let temp = {...user};
    temp.channels.push(channel);
    setUser(temp);
    setNewChannel('');
    setModalVisible(false);
  }

  const ModalItem = (channels) => {
    const check = channels.channel.items.find(item => item.data[0]===props.route.params.key);
    const pos = user.channels.indexOf(channels.channel);

    return <TouchableOpacity
      style={{ ...styles.channelButton}}
      onPress={() => {onPressModalItem(pos, channels.channel.detail.title)}}
      disabled={!!check}
    >
      <Icon name={!check ? 'cast-connected' : 'check'} size={18} />
      <Text style={styles.textStyle}>  {channels.channel.detail.title} {!check ? '' : '(added)'}</Text>
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
                  onPress={() => {props.closeModel(), setModalVisible(true)}}
                >
                  <Icon name={'plus'} type={"font-awesome-5"} size={14} />
                  <Text style={styles.textStyle}>  New channel</Text>
                </TouchableOpacity>

                {user.channels.map((channel, index) => <ModalItem key={channel+index} channel={channel}/>)}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    <Modal style={{background: 'red'}}
           animationType="fade"
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
                  onPress={() => {!user.channels.find(channel => channel.detail.title===newChannel) ? onPressSaveNewChannel() : null}}
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
