import React from 'react';
import {ScrollView, View} from 'react-native';
import {globalStyles} from "../../globles/styles";
import GeneralChannelDetail from "./GeneralChannelDetail/general-channel-detail";
import ChannelProgress from "./ChannelProgress/channel-progress";
import ItemsInChannel from "./ItemsInChannel/items-in-channel";

const ChannelDetail = (props) => {
  const channelDetail= {
    detail:{
      titleChannel: 'react',
      user: 'Thien Nhan',
      type: 'Private',
      member: 1,
    },
    progress: 10,
    items: [
      {
        typeItem: 'path',
        data: {
          id: 1,
          title: 'React',
          noCourse: '9 course',
        }
      },
      {
        typeItem: 'course',
        data: {
          id: 2,
          title: 'Building Mobile Apps with Visual Studio Tools for Apache Cordova',
          author: 'Matt Honeycutt',
          level: 'Beginner',
          released: 'Jan 17, 2017',
          duration: '3h 41m',
        }
      },
      {
        typeItem: 'course',
        data: {
          id: 3,
          title: 'Building Hybrid Mobile Applications with HTML5',
          author: 'Jon Flanders',
          level: 'Intermediate',
          released: 'Mar 9, 2012',
          duration: '4h 25m',
        }
      }
    ]
  }

  return <ScrollView style={globalStyles.container}>
    <GeneralChannelDetail detail={channelDetail.detail}/>
    <ChannelProgress progress={channelDetail.progress}/>
    <ItemsInChannel items={channelDetail.items} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default ChannelDetail;
