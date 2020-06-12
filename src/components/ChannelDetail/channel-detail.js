import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import {globalStyles} from "../../globles/styles";
import GeneralChannelDetail from "./GeneralChannelDetail/general-channel-detail";
import ChannelProgress from "./ChannelProgress/channel-progress";
import ItemsInChannel from "./ItemsInChannel/items-in-channel";
import {ColorsContext} from "../../provider/colors-provider";

const ChannelDetail = (props) => {
  const {theme} = useContext(ColorsContext)

  return <ScrollView style={{...globalStyles.container, backgroundColor: theme.background}}>
    <GeneralChannelDetail detail={props.route.params.channel.detail}/>
    <ChannelProgress progress={props.route.params.channel.progress}/>
    <ItemsInChannel items={props.route.params.channel.items} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default ChannelDetail;
