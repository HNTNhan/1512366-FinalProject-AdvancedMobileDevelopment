import React, {useContext} from 'react';
import {FlatList, View} from 'react-native';
import ListAuthorItems from "../ListAuthorItems/list-author-items";
import SectionTitle from "../../Common/section-title";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";

const ListAuthors = (props) => {
  const {defaultBackgroundColor} = useContext(ColorsContext);
  const data = !props.route.params ? props.data : !props.route.params.data ? props.data : props.route.params.data;
  const title = !props.route.params ? props.title : !props.route.params.title ? props.title : props.route.params.title;


  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = () => {
    props.navigation.navigate('AuthorDetail')
  }

  return <View style={[globalStyles.container, {backgroundColor: defaultBackgroundColor.background}]}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListAuthorItems item={item} onPress={onPressItem}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {title ? () =>  <SectionTitle title={'11 Result'} button={'Filter'} /> : null}
    />
  </View>
};

export default ListAuthors;
