import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";

const ItemsInChannel = (props) => {
  const {theme} = useContext(ColorsContext)

  const onPressCourseItem = (id) => {
    props.navigation.navigate('CourseDetail', {id: id});
  }

  return <View>
    <View>
      <Text style={{...styles.title, color: theme.text}}>Courses in channel</Text>
    </View>
    {
      props.items.map((item, index) => {
        return <View key={index} style={globalStyles.borderSeparator}>
          <ListCourseItems item={item} onPress={() => onPressCourseItem(item.id)}/>
        </View>
      })
    }
  </View>
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginTop: 10
  }
})
export default ItemsInChannel;
