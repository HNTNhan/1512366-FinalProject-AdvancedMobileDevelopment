import React, {useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import SectionCourseItems from "../SectionCourseItems/section-course-items";
import PathItems from "../PathItems/path-items";
import ChannelItems from "../ChanneItems/channel-items";

const SectionCourses = (props) => {
  const onPressItemInListCourse = (key) => {
    props.navigation.navigate('CourseDetail', {key: key})
  }

  const onPressItemInListPath = (key) => {
    props.navigation.navigate('PathDetail', {key: key})
  }

  const onPressItemInListChannel = (channel) => {
    props.navigation.navigate('ChannelDetail', {channel: channel})
  }

  const renderListItems = () => {
    return props.data.map( (item) => <SectionCourseItems key={item.key}  item={item} onPress={() => onPressItemInListCourse(item.key)} />);
  }

  const renderPathItems = () => {
    return props.data.map( (item) => <PathItems key={item.key} item={item} onPress={() => onPressItemInListPath(item.key)} />);
  }

  const renderChannelItems = () => {
    return props.data.map( (item) => <ChannelItems key={item.detail.title} item={item} onPress={() => onPressItemInListChannel(item)} />);
  }

  return <View style={styles.container}>
    <View style={styles.title}>
      <Text style={styles.titleText}>{props.title}</Text>
      {props.hasButton!==false ?<TouchableOpacity style={styles.button}
                        onPress={props.pressSeeAll}
      >
        <Text>  See all >  </Text>
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
    backgroundColor: 'rgb(219, 221, 231)',
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
