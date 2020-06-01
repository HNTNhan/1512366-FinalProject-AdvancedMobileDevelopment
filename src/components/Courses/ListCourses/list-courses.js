import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import ListCourseItems from "../ListCourseItems/list-course-items";
import ListPathItems from "../ListPathItems/list-path-items";
import ListAuthorItems from "../ListAuthorItems/list-author-items";
import SectionTitle from "../../Common/section-title";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";

const ListCourses = (props) => {
  const {defaultBackgroundColor} = useContext(ColorsContext)

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = (key) => {
    props.navigation.navigate('CourseDetail', {key: key})
  }

  return <View style={[globalStyles.container, {backgroundColor: defaultBackgroundColor.background}]}>
    <FlatList
      data={props.route.params.data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListCourseItems item={item} onPress={() => onPressItem(item.key)}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {props.route.params.title ? () => <SectionTitle title={'42 Result'} button={'Filter'}/> : null}
    />
  </View>
};

export default ListCourses;
