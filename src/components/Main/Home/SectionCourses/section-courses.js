import React, {useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import SectionCourseItems from "../SectionCourseItems/section-course-items";
import PathItems from "../PathItems/path-items";
import ChannelItems from "../ChanneItems/channel-items";
import {ColorsContext} from "../../../../provider/colors-provider";

const SectionCourses = (props) => {
  const {theme} = useContext(ColorsContext)

  const onPressItemInListCourse = (key) => {
    props.navigation.navigate('CourseDetail', {key: key})
  }

  const onPressItemInListPath = (key, title) => {
    props.navigation.navigate('PathDetail', {key: key, name: title})
  }

  const onPressItemInListChannel = (channel, title) => {
    props.navigation.navigate('ChannelDetail', {channel: channel, name: title})
  }

  const renderListItems = () => {
    return props.data.map( (item) => <SectionCourseItems key={item.key}  item={item} onPress={() => onPressItemInListCourse(item.key)} />);
  }

  const renderPathItems = () => {
    return props.data.map( (item) => <PathItems key={item.key} item={item} onPress={() => onPressItemInListPath(item.key, item.detail.title)} />);
  }

  const renderChannelItems = () => {
    return props.data.map( (item) => <ChannelItems key={item.detail.title} item={item} onPress={() => onPressItemInListChannel(item, item.detail.title)} />);
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
      {props.type==='Path' ? renderPathItems() : props.type==='Channel'
        ? renderChannelItems() : renderListItems()}
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
