import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from "react-native-elements";
import { Menu, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import {AuthenticationContext} from "../../provider/authentication-provider";
import AddToChannelDialog from "./add-to-channel-dialog";

const CourseDropDownButton = (props) => {
  const {user, setUser} = useContext(AuthenticationContext);
  const [modalVisible, setModalVisible] = useState(false);

  const onSelectBookmark = () => {
    let temp = {...user};
    const pos = user.bookmarks.indexOf(props.keyItem);
    if(pos !== -1) {
      temp.bookmarks.splice(pos, 1);
    } else {
      temp.bookmarks.push(props.keyItem);
    }
    setUser(temp);
  }

  const onSelectDownload = () => {
    let temp = {...user};
    const pos = user.downloads.indexOf(props.keyItem);
    if(pos !== -1) {
      temp.downloads.splice(pos, 1);
    } else {
      temp.downloads.push(props.keyItem);
    }
    setUser(temp);
  }

  const onSelectAddToChannel = () => {
    setModalVisible(true)
  }

  const onPressClose = () => {
    setModalVisible(false)
  }

  return <View style={styles.container}>
    <Menu style={styles.dropdown}>
      <MenuTrigger triggerText={styles.trigger}>
        <View style={styles.trigger} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => onSelectBookmark()} >
          <Text>{user.bookmarks.indexOf(props.keyItem)!==-1 ? 'UnBookmark' : 'Bookmark'}</Text>
        </MenuOption>
        <MenuOption onSelect={() => onSelectAddToChannel()} text={'Add to channel'} />
        <MenuOption onSelect={() => onSelectDownload()} text={user.downloads.indexOf(props.keyItem)!==-1 ? 'Downloaded' : 'Download'} />
      </MenuOptions>
    </Menu>
    <Icon name='ellipsis-v'
          size={props.iconSize}
          type='font-awesome-5'
    />
    <AddToChannelDialog modalVisible={modalVisible} keyItem={props.keyItem} closeModel={() => onPressClose()}/>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%'
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
  }
})

export default CourseDropDownButton;
