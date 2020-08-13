import React, {useContext, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyles} from "../../../globles/styles";
import ListChannelItems from "../ListChannelItems/list-channel-items";
import {ColorsContext} from "../../../provider/colors-provider";

const ListChannels = (props) => {
  const {theme} = useContext(ColorsContext)
  const [data, setData] = useState(props.route.params.data)

  const onPressItem = (channel, title) => {
    props.navigation.navigate('ChannelDetail', {channel: channel, name: title})
  }

  return <View style={[globalStyles.container, {backgroundColor: theme.background}]} >
    <FlatList
      data={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListChannelItems item={item} setData={(newData) => setData(newData)} onPress={() => onPressItem(item, item.detail.title)}/>}
      ItemSeparatorComponent= {() => <View style={globalStyles.separator} />}
    />
  </View>
};


export default ListChannels;
