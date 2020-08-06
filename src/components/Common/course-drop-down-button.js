import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from "react-native-elements";
import { Menu, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import {AuthenticationContext} from "../../provider/authentication-provider";
import {getFavoriteStatus, setFavoriteStatus} from "../../core/services/user-services";
import {UserContext} from "../../provider/user-provider";
import {alertSignIn} from "../../globles/alert";
import AddToChannelDialog from "./add-to-channel-dialog";
import {getCoursesDownload, storeCoursesDownload} from "../../core/local_storage/courses-download-storage";
import * as FileSystem from "expo-file-system";
import {ColorsContext} from "../../provider/colors-provider";

const CourseDropDownButton = (props) => {
  const {state} = useContext(AuthenticationContext);
  const {theme} = useContext(ColorsContext)
  const userContext = useContext(UserContext);
  const [favorite, setFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if(state.isAuthenticated) {
      let mounted = true;
      getFavoriteStatus(state.token, props.keyItem)
        .then((res) => {
          if(res.status === 200) {
            if(mounted){
              if(favorite !== res.data.likeStatus) {
                setFavorite(res.data.likeStatus)
              } else {}
            }
          } else {
            //return res.data.message
          }
        })
        .catch((err) => {
          alert(err.response.data.message || err)
        })

      return () => mounted = false
    } else {}
  }, [])

  useEffect(() => {
    if(userContext.state.favoriteCoursesChange === props.keyItem) {
      setFavorite(!favorite);
    } else {

    }
  }, [userContext.state.favoriteCoursesChange])

  const onSelectFavorite = () => {
    let mounted = true;
    setFavoriteStatus(state.token, props.keyItem)
      .then((res) => {
        if(res.status === 200) {
          if(mounted) {
            console.log()
            userContext.favoriteCoursesChange(props.keyItem)
          }
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        alert(err.response.data.message || err)
      })
    return () => mounted = false
  }

  const onSelectDownload = () => {

  }

  const onSelectAddToChannel = () => {
    setModalVisible(true)
  }

  const onPressRemove = () => {
    getCoursesDownload().then(async res => {
      if(res.status===200) {
        let temp = [...res.data]
        for(let i=0; i<temp.length; i++) {
          if(temp[i].id===state.userInfo.id) {
            for(let j=0; j<temp[i].courses.length; j++) {
              if(temp[i].courses[j].id===props.keyItem) {
                temp[i].courses.splice(j, 1)
                await storeCoursesDownload(temp)
                await FileSystem.deleteAsync(FileSystem.documentDirectory + '/itedu/'+ state.userInfo.id + '/' + props.keyItem, {idempotent: true})
                return
              } else {}
            }
          } else {}
        }
      } else {
        alert(res.error)
      }
    })
  }

  return <View style={styles.container}>
    <Menu style={styles.dropdown}>
      <MenuTrigger triggerText={styles.trigger}>
        <View style={styles.trigger} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => state.isAuthenticated ? onSelectFavorite() : alertSignIn()} >
          <Text>{favorite ? 'UnFavorite' : 'Favorite'}</Text>
        </MenuOption>
        {/*<MenuOption onSelect={() => state.isAuthenticated ? onSelectDownload() : alertSignIn()} text={'Download'} />*/}
        <MenuOption onSelect={() => state.isAuthenticated ? onSelectAddToChannel() : alertSignIn()} text={'Add to channel'} />
        {
          props.type==='download' ? <MenuOption onSelect={() => onPressRemove()} text={'Remove'}/> : null
        }
      </MenuOptions>
    </Menu>
    <Icon name='ellipsis-v'
          size={props.iconSize}
          type='font-awesome-5'
          color={theme.foreground2}
    />

    {
      props.courseDetail ? <AddToChannelDialog modalVisible={modalVisible} courseDetail={props.courseDetail} closeModel={() => setModalVisible(false)}/> : null
    }
    <AddToChannelDialog modalVisible={modalVisible} courseDetail={props.courseDetail} closeModel={() => setModalVisible(false)}/>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1.1,
    justifyContent: 'center',
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
