import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import ListCourseItems from "../ListCourseItems/list-course-items";
import SectionTitle from "../../Common/section-title";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import SectionTitleFilter from "../../Common/section-title-filter";

const ListCourses = (props) => {
  const {theme} = useContext(ColorsContext)
  const data = !props.route.params ? props.data : !props.route.params.data ? props.data : props.route.params.data;
  const title = !props.route.params ? props.title : !props.route.params.title ? props.title : props.route.params.title;

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  const onPressItem = (id) => {
    props.navigation.navigate('CourseDetail', {id: id})
  }

  return <View style={{...globalStyles.container, backgroundColor: theme.background}}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => item.id}
      renderItem={({item}) => <ListCourseItems item={item} onPress={() => onPressItem(item.id)}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {title ? !props.titleType ? () => <SectionTitle title={title} buttonText={props.button}/> :
        <SectionTitleFilter title={title}
                            onPressFilterLevel={props.onPressFilterLevel}
                            onPressFilterTime={props.onPressFilterTime} />
      : null}
    />
  </View>
};

export default ListCourses;
