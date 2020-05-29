import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyles} from "../../../globles/styles";
import SectionTitle from "../../Common/section-title";
import ListPathItems from "../ListPathItems/list-path-items";
import ListChannelItems from "../ListChannelItems/list-channel-items";
import {ColorsContext} from "../../../provider/colors-provider";

const ListChannels = (props) => {
  const {defaultBackgroundColor} = useContext(ColorsContext)

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = () => {
    props.navigation.navigate('ChannelDetail')
  }

  return <View style={[globalStyles.container, {backgroundColor: defaultBackgroundColor.background}]}>
    <FlatList
      data={props.route.params.data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListChannelItems item={item} onPress={onPressItem}/>}
      ItemSeparatorComponent= {renderSeparator}
      //ListHeaderComponent = {() => <SectionTitle title={'8 Result'} button={'Filter'}/>}
    />
  </View>
};


export default ListChannels;
