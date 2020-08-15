import React, {useContext} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import ListCourseItems from "../../../../Courses/ListCourseItems/list-course-items";
import {globalStyles} from "../../../../../globles/styles";
import {Button, Icon} from "react-native-elements";
import {ColorsContext} from "../../../../../provider/colors-provider";
import ListAuthorItems from "../../../../Courses/ListAuthorItems/list-author-items";

const AllResult = (props) => {
  const {theme} = useContext(ColorsContext)

  const onPressCourse = (id) => {
    props.navigation.navigate('CourseDetail', {id: id})
  }

  const onPressAuthor = (id, name) => {
    props.navigation.navigate('AuthorDetail', {key: id, title: name})
  }

  return <ScrollView style={styles.container}>
    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
      <Text style={{...styles.title, color: theme.text}}>{props.language.search.courses}</Text>
      <Button title={`${props.coursesTotal} ${props.coursesTotal > 1 ? ' '+props.language.search.courses : ' '+props.language.search.course}`}
              type={"clear"} titleStyle={{fontSize: 16}}/>
    </View>
    {
      props.courses.map((item, index) => {
        return <View key={item + index}>
          <ListCourseItems item={item} onPress={() => onPressCourse(item.id)}/>
          <View style={globalStyles.separator} />
        </View>
      })
    }

    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
      <Text style={{...styles.title, color: theme.text}}>{props.language.search.authors}</Text>
      <Button title={`${props.authorsTotal} ${props.authorsTotal > 1 ? ' '+props.language.search.authors : ' '+props.language.search.author}`}
              type={"clear"} titleStyle={{fontSize: 16}}/>
    </View>
    {
      props.authors.map((item, index) => {
        return <View key={item + index}>
          <ListAuthorItems item={item} onPress={() => onPressAuthor(item.id, item.name)} language={props.language}/>
          <View style={globalStyles.separator} />
        </View>
      })
    }
  </ScrollView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
})
export default AllResult;
