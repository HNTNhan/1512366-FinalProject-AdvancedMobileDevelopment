import React, {useContext, useState} from 'react';
import {ScrollView, SectionList, StyleSheet, View} from 'react-native';
import ListLessonItems from "../ListLessonItems/list-lesson-items";
import ListLessonTitle from "../ListLessonTitle/list-lesson-title";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";

const ListLessons = (props) => {
  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  return <SectionList
    sections={props.lessons}
    keyExtractor={(item, index) => item + index}
    renderItem={({item, index}) =>
      <ListLessonItems item={item}/>
    }
    renderSectionHeader={({section: {title, totalDuration, id}}) => <ListLessonTitle index={id} title={title} totalDuration={totalDuration}/>}
    SectionSeparatorComponent={renderSeparator}
  />
};

export default ListLessons;
