import React from 'react';
import {ScrollView, View} from 'react-native';
import {globalStyles} from "../../globles/styles";
import GeneralChannelDetail from "./GeneralChannelDetail/general-channel-detail";
import ChannelProgress from "./ChannelProgress/channel-progress";
import ItemsInChannel from "./ItemsInChannel/items-in-channel";

const ChannelDetail = (props) => {
  return <ScrollView style={globalStyles.container}>
    <GeneralChannelDetail detail={props.route.params.channel.detail}/>
    <ChannelProgress progress={props.route.params.channel.progress}/>
    <ItemsInChannel items={props.route.params.channel.items} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default ChannelDetail;
