import React from 'react';
import {TouchableOpacity, View, StyleSheet, ScrollView} from 'react-native';
import {Button, Icon, Image, Text} from "react-native-elements";
import AuthorIconButton from "../../Common/author-icon-button";
import IconButton from "../../Common/icon-button";
import DescriptionOpenClose from "../../Common/description-open-close";

const GeneralCourseDetail = (props) => {
  const authorListItems = (props) => {
    return props.detail.author.map((item, index) => <AuthorIconButton key={index} item={item}/>);
  }

  return <ScrollView>
    <Text style={styles.title}>{props.detail.title}</Text>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.author}>
        {authorListItems(props)}
      </View>
    </ScrollView>
    <Text style={{fontSize: 12}}>{props.detail.level} . {props.detail.released} . {props.detail.duration}</Text>
    <View style={styles.activeContainer}>
      <IconButton name='bookmark-border' title='Bookmark'/>
      <IconButton name='cast-connected' title='Add to channel'/>
      <IconButton name='get-app' title='Download'/>
    </View>
    <DescriptionOpenClose description={props.detail.description} noLines={3}/>
    <Button
      title='Take a learning check'
      type='outline'
      icon={
        <Icon name='tasks' type='font-awesome-5' color='#3498db' iconStyle={{marginHorizontal: 8}}/>
      }
      containerStyle={{marginVertical: 5}}
    />
    <Button
      title='View related paths & course'
      type='outline'
      icon={
        <Icon name='layer-group' type='font-awesome-5' color='#3498db' iconStyle={{marginHorizontal: 8}}/>
      }
      containerStyle={{marginVertical: 5}}
    />
  </ScrollView>
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  author: {
    flexDirection: 'row'
  },
  activeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
export default GeneralCourseDetail;
