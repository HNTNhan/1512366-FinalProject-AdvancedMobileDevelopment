import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {findByKey} from "../../../testdata/find-data";
import {coursesData} from "../../../testdata/courses-data";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";

const Download = (props) => {
  const {theme} = useContext(ColorsContext)
  const {user, setUser} = useContext(AuthenticationContext);

  const renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  const renderHeader = () => {
    return <View style={styles.header}>
      <Text style={{...styles.headerText, color: theme.text}}>Download</Text>
      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          let temp={...user};
                          temp.downloads=[];
                          setUser(temp);
                        }}>
        <Text style={styles.buttonText}> Remove all </Text>
      </TouchableOpacity>
    </View>
  }

  const onPress = (key) => {
    props.navigation.push('CourseDetail', {key: key});
  }

  return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
    <FlatList
      data={findByKey(coursesData, user.downloads)}
      keyExtractor={(item, index) => item.key}
      renderItem={({item}) => <ListCourseItems item={item} onPress={() => onPress(item.key)}/>}
      ItemSeparatorComponent= {renderSeparator}
      ListHeaderComponent = {renderHeader}
    />
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    padding: 3,
    borderRadius: 10,
    marginRight: 20,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#19B5FE',
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
    marginLeft: 105,
  },
})
export default Download;
