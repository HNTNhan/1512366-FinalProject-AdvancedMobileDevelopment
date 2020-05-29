import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyles} from "../../../globles/styles";
import SectionTitle from "../../Common/section-title";
import ListPathItems from "../ListPathItems/list-path-items";
import {ColorsContext} from "../../../provider/colors-provider";

const ListPaths = (props) => {
  const {defaultBackgroundColor} = useContext(ColorsContext)

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = () => {
    props.navigation.navigate('PathDetail')
  }

  return <View style={[globalStyles.container, {backgroundColor: defaultBackgroundColor.background}]}>
    <FlatList
      data={props.route.params.data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListPathItems item={item} onPress={onPressItem}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {props.route.params.title ? () => <SectionTitle title={'8 Result'} button={'Filter'}/> : null}
    />
  </View>
};


export default ListPaths;
