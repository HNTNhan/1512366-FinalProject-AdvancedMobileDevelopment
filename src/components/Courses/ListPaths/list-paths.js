import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyles} from "../../../globles/styles";
import SectionTitle from "../../Common/section-title";
import ListPathItems from "../ListPathItems/list-path-items";
import {ColorsContext} from "../../../provider/colors-provider";

const ListPaths = (props) => {
  const {theme} = useContext(ColorsContext);
  const data = !props.route.params ? props.data : !props.route.params.data ? props.data : props.route.params.data;
  const title = !props.route.params ? props.title : !props.route.params.title ? props.title : props.route.params.title;

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = (key, title) => {
    props.navigation.navigate('PathDetail', {key: key, name: title})
  }

  return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListPathItems item={item} onPress={() => onPressItem(item.key, item.detail.title)}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {title ? () => <SectionTitle title={title} /> : null}
    />
  </View>
};


export default ListPaths;
