import React, {useState, useContext} from 'react';
import {StyleSheet, View, Alert, Modal, TouchableHighlight} from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import {Icon, Text} from "react-native-elements";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import AddToChannelDialog from "../../Common/add-to-channel-dialog";

const PathDetailRightHeader = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onSelectAddToChannel = () => {
    setModalVisible(true)
  }

  const onPressClose = () => {
    setModalVisible(false)
  }

  function onSelectSharePath() {
    return undefined;
  }

  return <View style={styles.container}>
    <Menu style={styles.dropdown}>
      <MenuTrigger triggerWrapper={styles.trigger}>
        <View style={styles.trigger} />
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        <MenuOption onSelect={() => onSelectAddToChannel()} >
          <Text style={styles.menuOptionText}>Add to channel</Text>
        </MenuOption>
        <MenuOption onSelect={() => onSelectSharePath()} >
          <Text style={styles.menuOptionText}>Share path</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
    <Icon name='ellipsis-v'
          size={20}
          type='font-awesome-5'
    />
    <AddToChannelDialog modalVisible={modalVisible} route={props.route} closeModel={() => onPressClose()}/>
  </View>
};

const optionsStyles = {
  optionsContainer: {
    paddingHorizontal: 5,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    width: 150,
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: 30,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  trigger: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  menuOptionText: {
    fontSize: 18,
  },
})

export default PathDetailRightHeader;
