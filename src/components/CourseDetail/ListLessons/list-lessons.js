import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, SectionList, StyleSheet, Text, View} from 'react-native';
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

  return !loading ?
    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
      {
        props.courseDetail.promoVidUrl ? <View>
          <ListLessonTitle index={0} title={'Course Overview'} totalDuration={0}/>
          <ListLessonItems type={'overview'} onPress={() => props.onPressLesson({promoVidUrl: props.courseDetail.promoVidUrl})}/>
        </View> : null
      }
      <SectionList
        sections={section}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <ListLessonItems item={item} type={'lesson'} onPress={() => props.onPressLesson(item)}/>}
        renderSectionHeader={({section: {name, sumHours, numberOrder}}) => <ListLessonTitle index={numberOrder} title={name} totalDuration={sumHours}/>}
        SectionSeparatorComponent={() => <View style={globalStyles.separator} />}
      />
    </ScrollView>
    : null
};

export default ListLessons;
