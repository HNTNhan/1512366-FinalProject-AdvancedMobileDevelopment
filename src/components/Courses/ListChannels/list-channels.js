import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyles} from "../../../globles/styles";
import SectionTitle from "../../Common/section-title";
import ListPathItems from "../ListPathItems/list-path-items";
import ListChannelItems from "../ListChannelItems/list-channel-items";
import {ColorsContext} from "../../../provider/colors-provider";

const ListChannels = (props) => {
  const {theme} = useContext(ColorsContext)

  const onPressItem = (channel, title) => {
    props.navigation.navigate('ChannelDetail', {channel: channel, name: title})
  }

  return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
    <FlatList
      data={props.route.params.data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListChannelItems item={item} onPress={() => onPressItem(item, item.detail.title)}/>}
      ItemSeparatorComponent= {() => <View style={globalStyles.separator} />}
    />
  </View>
};


export default ListChannels;
