import React, {useContext} from 'react';
import {FlatList, View} from 'react-native';
import ListAuthorItems from "../ListAuthorItems/list-author-items";
import SectionTitle from "../../Common/section-title";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";

const ListAuthors = (props) => {
  const {theme} = useContext(ColorsContext);
  const data = !props.route.params ? props.data : !props.route.params.data ? props.data : props.route.params.data;
  const title = !props.route.params ? props.title : !props.route.params.title ? props.title : props.route.params.title;


  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = (key, name) => {
    props.navigation.navigate('AuthorDetail', {key: key, name: name})
  }

  return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListAuthorItems item={item} onPress={() => onPressItem(item.key, item.detail.name)}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {title ? () =>  <SectionTitle title={title} /> : null}
    />
  </View>
};

export default ListAuthors;
