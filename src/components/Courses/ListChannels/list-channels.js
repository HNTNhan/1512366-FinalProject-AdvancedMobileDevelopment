import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyles} from "../../../Globles/styles";
import SectionTitle from "../../Common/section-title";
import ListPathItems from "../ListPathItems/list-path-items";
import ListChannelItems from "../ListChannelItems/list-channel-items";

const ListChannels = (props) => {
  const channels = [
    {
      id: 1,
      title: 'React',
    },
    {
      id: 2,
      title: 'js',
    },
  ];

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = () => {
    props.navigation.navigate('ChannelDetail')
  }

  return <View style={{backgroundColor: 'rgb(240, 239, 245)'}}>
    <FlatList
      data={channels}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListChannelItems item={item} onPress={onPressItem}/>}
      ItemSeparatorComponent= {renderSeparator}
      //ListHeaderComponent = {() => <SectionTitle title={'8 Result'} button={'Filter'}/>}
    />
  </View>
};


export default ListChannels;
