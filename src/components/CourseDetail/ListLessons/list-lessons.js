import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, SectionList, StyleSheet, View} from 'react-native';
import ListLessonItems from "../ListLessonItems/list-lesson-items";
import ListLessonTitle from "../ListLessonTitle/list-lesson-title";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";

const ListLessons = (props) => {
  const [loading, setLoading] = useState(true);
  let section = props.courseDetail.section;

  useEffect(() => {
    for(let i=0; i<section.length; i++) {
      section[i]['data'] = section[i]['lesson']
    }

    setLoading(false)
  }, [])

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  return !loading ?
    <SectionList
      sections={section}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListLessonItems item={item}/>}
      renderSectionHeader={({section: {name, sumHours, numberOrder}}) => <ListLessonTitle index={numberOrder} title={name} totalDuration={sumHours}/>}
      SectionSeparatorComponent={renderSeparator}
    /> : null
};

export default ListLessons;
