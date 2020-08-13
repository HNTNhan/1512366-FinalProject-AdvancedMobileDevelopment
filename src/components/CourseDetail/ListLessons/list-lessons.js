import React, {useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, SectionList, StyleSheet, Text, View} from 'react-native';
import ListLessonItems from "../ListLessonItems/list-lesson-items";
import ListLessonTitle from "../ListLessonTitle/list-lesson-title";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import CenterActivityIndicator from "../../Common/center-activity-indicator";
import {getCourseProcess} from "../../../core/services/course-services";

const ListLessons = (props) => {
  const {theme} = useContext(ColorsContext);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState(props.courseDetail.section)

  if(props.isAuthenticated || props.courseDownload) {
    useEffect(() => {
      if(props.courseDownload) {
        setSection(props.courseDownload.section)
        setLoading(false)
      } else {
        setSection(props.courseDetail.section)
        setLoading(false)
      }
    }, [props.courseDownload])

    if(loading) {
      return <CenterActivityIndicator />
    } else {
      return <View>
          <SectionList
            sections={section}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, section: {downloaded}}) =>
              <ListLessonItems item={item} checkOwn={props.checkOwn} courseId={props.courseId} videoLoading={props.videoLoading} downloaded={downloaded}
                               type={item.numberOrder!==0 ? 'lesson' : 'overview'} onPress={props.onPressLesson} showInfoDialog={props.showInfoDialog}/>}
            renderSectionHeader={({section: {name, sumHours, numberOrder, data, downloaded, id, index}}) =>
              <ListLessonTitle index={numberOrder} title={name} totalDuration={sumHours} downloaded={downloaded} id={id} checkOwn={props.checkOwn}
                               onPressDownloadSection={() => props.onPressDownloadSection(data, numberOrder)}/>}
            SectionSeparatorComponent={() => <View style={globalStyles.separator} />}
          />
        </View>
    }
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
