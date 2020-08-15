import React, {useContext} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {ColorsContext} from "../../../../provider/colors-provider";
import {Icon} from "react-native-elements";
import {getChannel, storeChannel} from "../../../../core/local_storage/channel-storage";
import {AuthenticationContext} from "../../../../provider/authentication-provider";
import {UserContext} from "../../../../provider/user-provider";

const ChannelItems = (props) => {
  const {theme} = useContext(ColorsContext)
  const {state} = useContext(AuthenticationContext)
  const userContext = useContext(UserContext)
  const index = props.index%4+1

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
              }
            }
          } else {}
        }
      } else {

      }
    })
  }

  return <TouchableOpacity style={{...styles.item, backgroundColor: theme.foreground1}} onPress={props.onPress}>
    <Image
      source={index===1 ? require('../../../../../assets/channel1.jpg') :
        index===2 ? require('../../../../../assets/channel2.jpg') :
        index===3 ? require('../../../../../assets/channel3.jpg') :
          require('../../../../../assets/channel4.jpg')
      }
           style={styles.image}/>
    <View style={styles.detail}>
      <Text style={{fontSize: 16, color: theme.text}}>{props.item.detail.title}</Text>
    </View>
    <TouchableOpacity style={styles.dropDownButton} onPress={() => onPressRemove()}>
      <Icon name={'trash-alt'} type={"font-awesome-5"} size={20} color={theme.foreground2}/>
    </TouchableOpacity>
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    marginRight: 10,
    marginBottom: 10,
    width: 220,
    height: 170,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 25,
  },
  image: {
    width: 220,
    height: 110,
    opacity: 0.8,
  },
  detail: {
    padding: 5,
    flexShrink: 1,
    borderTopColor: 'gray',
    borderTopWidth: 1,
  },
  darkText: {
    color: '#777777',
  },
  dropDownButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '20%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default ChannelItems;
