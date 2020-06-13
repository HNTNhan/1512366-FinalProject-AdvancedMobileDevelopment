import React, {useContext} from 'react';
import {TouchableOpacity, View, StyleSheet, ScrollView} from 'react-native';
import {Button, Icon, Image, Text} from "react-native-elements";
import AuthorIconButton from "../../Common/author-icon-button";
import IconButton from "../../Common/icon-button";
import DescriptionOpenClose from "../../Common/description-open-close";
import {ColorsContext} from "../../../provider/colors-provider";

const GeneralCourseDetail = (props) => {
  const {theme} = useContext(ColorsContext)

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const authorListItems = (author) => {
    return author.map((item, index) => <AuthorIconButton key={index} item={item} text={theme.text} onPress={() => onPressAuthorItem(item.key, item.detail.name)}/>);
  }

  const onPressAuthorItem = (key, name) => {
    props.navigation.navigate('AuthorDetail', {key: key, name: name})
  }

  return <ScrollView showsVerticalScrollIndicator={false}>
    <Text style={{...styles.title, color: theme.text}}>{props.detail.title}</Text>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.author}>
        {authorListItems(props.author)}
      </View>
    </ScrollView>
    <Text style={{fontSize: 14, color: theme.text}}>{props.detail.level} . {monthNames[props.detail.released.getMonth()]} {props.detail.released.getDate()} {props.detail.released.getFullYear()} . {props.detail.duration}</Text>
    <View style={styles.activeContainer}>
      <IconButton name='bookmark-border' title='Bookmark'/>
      <IconButton name='cast-connected' title='Add to channel'/>
      <IconButton name='get-app' title='Download'/>
    </View>
    <DescriptionOpenClose description={props.detail.description} noLines={3} text={theme.text} foreground={theme.foreground1}/>
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
