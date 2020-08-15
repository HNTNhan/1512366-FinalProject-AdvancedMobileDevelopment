import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import ListCourseItems from "../ListCourseItems/list-course-items";
import SectionTitle from "../../Common/section-title";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {UserContext} from "../../../provider/user-provider";

const ListCourses = (props) => {
  const {theme} = useContext(ColorsContext);
  const userContext = useContext(UserContext);
  const type = !props.route.params ? '' : props.route.params.name;
  const data = !props.route.params ? props.data : !props.route.params.data ? props.data : props.route.params.data;
  const title = !props.route.params ? props.title : !props.route.params.title ? props.title : props.route.params.title;



  const onPressItem = (id) => {
    props.navigation.navigate('CourseDetail', {id: id})
  }

  return <View style={{...globalStyles.container, backgroundColor: theme.background}}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={type === 'Continue learning' ? userContext.state.continueCoures : type === 'Favorite courses' ? userContext.state.favoriteCourses : data}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <ListCourseItems item={item} onPress={() => onPressItem(item.id)}/>}
      ItemSeparatorComponent= {() => <View style={globalStyles.separator} />}
      ListHeaderComponent = {title ? () => <SectionTitle title={title} buttonText={props.button}/> : null}
    />
  </View>
};

export default ListCourses;