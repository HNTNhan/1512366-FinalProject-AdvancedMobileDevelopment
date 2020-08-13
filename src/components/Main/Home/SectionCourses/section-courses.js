import React, {useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import SectionCourseItems from "../SectionCourseItems/section-course-items";
import {ColorsContext} from "../../../../provider/colors-provider";
import ChannelItems from "../ChanneItems/channel-items";
import {LanguageContext} from "../../../../provider/language-provider";

const SectionCourses = (props) => {
  const {theme} = useContext(ColorsContext)
  const {language} = useContext(LanguageContext)

  const onPressItemInListCourse = (id) => {
    props.navigation.push('CourseDetail', {id: id})
  }

  const onPressItemInListChannel = (item) => {
    props.navigation.navigate('ChannelDetail', {channel: item, name: item.detail.title})
  }

  const renderListItems = () => {
    return props.data.map( (item) =>
      <SectionCourseItems key={item.id} item={item} onPress={() => onPressItemInListCourse(item.id)} />);
  }

  const renderChannelItems = () => {
    return props.data.map( (item) =>
      <ChannelItems key={item.detail.title} item={item} onPress={() => onPressItemInListChannel(item)} />);
  }

  return <View style={styles.container}>
    <View style={styles.title}>
      <Text style={{...styles.titleText, color: theme.text}}>{props.title}</Text>
      {
        props.data.length ? <TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}} onPress={props.pressSeeAll}>
            <Text style={{color: theme.text}}>{language.home.sectionCourse.seeAll}</Text>
        </TouchableOpacity> : null
      }
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {props.type === 'Course' ? renderListItems() : renderChannelItems()}
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
