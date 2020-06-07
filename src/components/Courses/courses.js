import React, {useContext} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import ListCourseItems from "./ListCourseItems/list-course-items";
import ListPathItems from "./ListPathItems/list-path-items";
import ListAuthorItems from "./ListAuthorItems/list-author-items";
import SectionTitle from "../Common/section-title";
import {globalStyles} from "../../globles/styles";
import {ColorsContext} from "../../provider/colors-provider";

const Courses = (props) => {
  const {defaultBackgroundColor} = useContext(ColorsContext);

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };


  const onPressCourseItem = (key) => {
    props.navigation.navigate('CourseDetail', {key: key})
  }

  const onPressPathItem = (key) => {
    props.navigation.navigate('PathDetail', {key: key})
  }

  const onPressAuthorItem = (key) => {
    props.navigation.navigate('AuthorDetail', {key: key})
  }

  const onPressSeeAll= (type) => {
    type==='Courses' ? props.jumpTo('second') : type==='Paths' ? props.jumpTo('third') : props.jumpTo('four');
  }

  return <View style={[globalStyles.container, {backgroundColor: defaultBackgroundColor.background}]}>
    <SectionList
      showsVerticalScrollIndicator={false}
      sections={props.data}
      keyExtractor={item => item.key}
      renderItem={({item,index, section}) =>
        section.title==="Courses" ? <ListCourseItems item={item} onPress={() => onPressCourseItem(item.key)}/>
          : section.title==="Paths" ? <ListPathItems item={item} onPress={() => onPressPathItem(item.key)}/> :
          <ListAuthorItems item={item} onPress={() => onPressAuthorItem(item.key)}/>
      }
      renderSectionHeader={({section: {title, amount}}) => <SectionTitle title={title} buttonText={amount} onPress={() => onPressSeeAll(title)}/>}
      ItemSeparatorComponent= {renderSeparator}
    />
  </View>
};

export default Courses;
