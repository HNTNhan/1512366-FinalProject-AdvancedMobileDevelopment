import React, {useContext} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";
import {Icon} from "react-native-elements";
import {getChannel, storeChannel} from "../../../core/local_storage/channel-storage";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {UserContext} from "../../../provider/user-provider";

const ListChannelItems = (props) => {
  const {theme} = useContext(ColorsContext)
  const {state} = useContext(AuthenticationContext)
  const userContext = useContext(UserContext)

  const onPressRemove = () => {
    getChannel().then(async res => {
      if(res.status===200) {
        let channels = res.data
        for(let i=0; i<channels.length; i++) {
          if(channels[i].id === state.userInfo.id) {
            for(let j=0; j<channels[i].channels.length; j++) {
              if(channels[i].channels[j].detail.title === props.item.detail.title) {
                channels[i].channels.splice(j, 1)
                await storeChannel(channels)
                userContext.requestUpdateChannel()
                props.setData(channels[i].channels)
              }
            }
          } else {}
        }
      } else {

      }
    })
  }

  return <TouchableOpacity style={styles.item} onPress={props.onPress}>
    <Image source={require('../../../../assets/ic_course.png')} style={styles.image}/>
    <View style={styles.detail}>
      <Text style={{color: theme.text}}>{props.item.detail.title}</Text>
    </View>
    <TouchableOpacity style={styles.dropDownButton} onPress={() => onPressRemove()}>
      <Icon name={'trash-alt'} type={"font-awesome-5"} size={16} color={theme.foreground2}/>
    </TouchableOpacity>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    width: 90,
    height: 50,
  },
  detail: {
    margin: 5,
  },
  darkText: {
    color: 'darkgray',
  },
  dropDownButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default ListChannelItems;
