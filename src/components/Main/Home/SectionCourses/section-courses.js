import React, {useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import SectionCourseItems from "../SectionCourseItems/section-course-items";
import {ColorsContext} from "../../../../provider/colors-provider";
import {alertSignIn} from "../../../../globles/alert";
import {AuthenticationContext} from "../../../../provider/authentication-provider";

const SectionCourses = (props) => {
  const {theme} = useContext(ColorsContext)
  const {state} = useContext(AuthenticationContext);

  const onPressItemInListCourse = (id) => {
    props.navigation.navigate('CourseDetail', {id: id})
  }

  const renderListItems = () => {
    return props.data.map( (item) =>
      <SectionCourseItems key={item.id}  item={item} onPress={() => onPressItemInListCourse(item.id)} />);
  }

  return <View style={styles.container}>
    <View style={styles.title}>
      <Text style={{...styles.titleText, color: theme.text}}>{props.title}</Text>
      {props.hasButton!==false ?<TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}}
                        onPress={props.pressSeeAll}
      >
        <Text style={{color: theme.text}}>  See all >  </Text>
      </TouchableOpacity> : null}
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {renderListItems()}
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'red',
    padding: 2,
    borderRadius: 10,
    marginRight: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})

export default SectionCourses;
