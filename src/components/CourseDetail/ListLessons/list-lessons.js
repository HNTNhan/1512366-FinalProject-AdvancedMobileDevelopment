import React, {useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, SectionList, StyleSheet, Text, View} from 'react-native';
import ListLessonItems from "../ListLessonItems/list-lesson-items";
import ListLessonTitle from "../ListLessonTitle/list-lesson-title";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";

const ListLessons = (props) => {
  const {theme} = useContext(ColorsContext);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState(props.courseDetail.section)

  if(props.isAuthenticated) {
    useEffect(() => {
      const overview = {
        numberOrder: 0,
        name: 'Course Overview',
        sumHours: 0,
        data: [
          {
            videoUrl: props.courseDetail.promoVidUrl || null,
            numberOrder: 0
          }
        ]
      }
      let section = props.courseDetail.section;

      for(let i=0; i<section.length; i++) {
        section[i]['data'] = section[i]['lesson']
      }
      section.unshift(overview)
      setSection(section)
      setLoading(false)
    }, [])

    return !loading ?
      <View>
        <SectionList
          sections={section}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <ListLessonItems item={item} checkOwn={props.checkOwn} courseId={props.courseId} videoLoading={props.videoLoading}
                                                   type={item.numberOrder!==0 ? 'lesson' : 'overview'} onPress={props.onPressLesson} showInfoDialog={props.showInfoDialog}/>}
          renderSectionHeader={({section: {name, sumHours, numberOrder}}) => <ListLessonTitle index={numberOrder} title={name} totalDuration={sumHours}/>}
          SectionSeparatorComponent={() => <View style={globalStyles.separator} />}
        />
      </View>
      : null
  } else {
     return <View style={styles.container}>
       <Text style={{fontSize: 16, color: theme.text}}>Please sign in to see this context!</Text>
     </View>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default ListLessons;
