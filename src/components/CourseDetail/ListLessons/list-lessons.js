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


  if(props.isAuthenticated || props.courseDownload) {
    useEffect(() => {
      if(props.courseDownload) {
        console.log('local')
        setSection(props.courseDownload.data.section)
        setLoading(false)
      } else {
        console.log('online')
        // const overview = {
        //   numberOrder: 0,
        //   name: 'Course Overview',
        //   sumHours: 0,
        //   data: [
        //     {
        //       videoUrl: props.courseDetail.promoVidUrl || null,
        //       numberOrder: 0
        //     }
        //   ]
        // }
        // let section = props.courseDetail.section;
        //
        // for(let i=0; i<section.length; i++) {
        //   section[i]['data'] = section[i]['lesson']
        //   delete section[i]['lesson']
        // }
        // section.unshift(overview)

        setSection(props.courseDetail.section)
        setLoading(false)
      }
    }, [])

    if(loading) {
      console.log(0)
      return null
    } else {
      console.log(1)
      return <View>
          <SectionList
            sections={section}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, section: {downloaded}}) =>
              <ListLessonItems item={item} checkOwn={props.checkOwn} courseId={props.courseId} videoLoading={props.videoLoading} downloaded={downloaded}
                               type={item.numberOrder!==0 ? 'lesson' : 'overview'} onPress={props.onPressLesson} showInfoDialog={props.showInfoDialog}/>}
            renderSectionHeader={({section: {name, sumHours, numberOrder, data, downloaded, id}}) =>
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
