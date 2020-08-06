import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {globalStyles} from "../../globles/styles";
import GeneralChannelDetail from "./GeneralChannelDetail/general-channel-detail";
import ChannelProgress from "./ChannelProgress/channel-progress";
import ItemsInChannel from "./ItemsInChannel/items-in-channel";
import {ColorsContext} from "../../provider/colors-provider";

const ChannelDetail = (props) => {
  const {theme} = useContext(ColorsContext)
  const [process, setProcess] = useState(0)

  useEffect(() => {
    let temp = 0
    props.route.params.channel.items.map((item) => {
      temp +=( Math.round(item.process * 100) / 100)

    })
    setProcess((temp/props.route.params.channel.items.length))
  }, [])

  return <ScrollView style={{...globalStyles.container, backgroundColor: theme.background}}>
    <GeneralChannelDetail detail={props.route.params.channel.detail}/>
    <ChannelProgress progress={process} />
    <ItemsInChannel items={props.route.params.channel.items} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default ChannelDetail;
