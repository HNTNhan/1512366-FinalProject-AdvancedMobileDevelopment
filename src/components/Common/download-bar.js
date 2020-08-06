import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {DownloadContext} from "../../provider/download-provider";
import {ColorsContext} from "../../provider/colors-provider";
import {storeCoursesDownload} from "../../core/local_storage/courses-download-storage";
import {AuthenticationContext} from "../../provider/authentication-provider";
import ytdl from "react-native-ytdl";
import * as FileSystem from "expo-file-system";
import {getLessonUrlAndTime} from "../../core/services/lesson-services";

const DownloadBar = (props) => {
  const {theme} = useContext(ColorsContext)
  const {state} = useContext(AuthenticationContext)
  const {downloadData, startDownload, setStartDownload, downloadId, setDownloadId} = useContext(DownloadContext)
  const [downloadInfo, setDownloadInfo] = useState({lessonName: 'Loading...:', progress: 0})


  useEffect( () => {
    if(startDownload) {
      if(downloadData.downloadSection) {
        downloadSectionCourse(downloadData.listAccountAndCourseDownload, downloadData.data, downloadData.detail, downloadData.numberOrder, downloadData.id)
          .then(() => {
            setStartDownload(false)
            setDownloadInfo({lessonName: 'Loading...:', progress: 0})
          })
      } else {
        downloadAllCourse(downloadData.listAccountAndCourseDownload, downloadData.data, downloadData.detail, downloadData.numberOrder, downloadData.id)
          .then(() => {
            setStartDownload(false)
            setDownloadInfo({lessonName: 'Loading...:', progress: 0})
          })
      }
    } else {}
  }, [startDownload])

  const downloadAllCourse = async (list, data, detail, numberOrder, id) => {
    let tempCourse;
    if(list.courseIndex!==-1) {
      console.log('storage')
      tempCourse = {...list.data[list.userIndex].courses[list.courseIndex]}
    } else {
      console.log('internet')
      tempCourse = detail
    }

    let tempList = {...list}
    for(let i=0; i<tempCourse.section.length; i++) {
      if(!tempCourse.section[i].downloaded) {
        setDownloadId({sectionId: tempCourse.section[i].id, courseId: downloadData.id})
        const course = await downloadSectionCourse(tempList, tempCourse.section[i].data, detail, tempCourse.section[i].numberOrder, id)

        if(tempList.userIndex===-1 && tempList.courseIndex===-1) {
          const userCoursesDownload = [{ id: state.userInfo.id, courses: [course] }]
          tempList = {data: userCoursesDownload, userIndex: 0, courseIndex: 0}
        } else if(tempList.userIndex!==-1 && tempList.courseIndex===-1) {
          const temp = [...tempList.data]
          // temp[tempList.userIndex].courses.push(course)
          tempList = {data: temp, userIndex: tempList.userIndex, courseIndex: temp[tempList.userIndex].courses.length-1}
        } else {
          // const temp = [...tempList.data]
          // temp[tempList.userIndex].courses[tempList.courseIndex] = course
          // tempList = {...tempList, data: temp}
        }
      } else {}
    }
  }

  const handleError = (setDownloadInfo) => {
    setDownloadInfo({lessonName: 'Loading...:', progress: 0})
    alert('Download fail! Please try again!')
  }

  const downloadSectionCourse = async (list, data, detail, numberOrder, id) => {
    let tempCourse
    let tempData = [...data]
    if(list.courseIndex===-1) {
      console.log('detail')
      tempCourse = {...detail}
    } else {
      console.log('not detail')
      tempCourse = {...list.data[list.userIndex].courses[list.courseIndex]}
    }

    if(numberOrder===0) {
      try {
        const result = await downloadSection(tempData, numberOrder, id, state.token, setDownloadInfo)
        if(result!==null) {
          tempCourse.section[0].data = result
          tempCourse.section[0].downloaded = true
        } else {
          handleError(setDownloadInfo)
          return null
        }
      } catch (e) {
        handleError(setDownloadInfo)
        return null
      }
    } else {
      try {
        for(let i=0; i<tempCourse.section.length; i++) {
          if(tempCourse.section[i].numberOrder === numberOrder) {
            const result = await downloadSection(tempData, numberOrder, id, state.token, setDownloadInfo)
            if(result!==null) {
              tempCourse.section[i].data = result
              tempCourse.section[i].downloaded = true
            } else {
              handleError(setDownloadInfo)
              return null
            }
            break;
          } else {}
        }
      } catch (e) {
        handleError(setDownloadInfo)
        return null
      }
    }

    let temp = list.data
    if(list.userIndex===-1 && list.courseIndex===-1) {
      console.log('type: 0')
      const userCoursesDownload = [{
        id: state.userInfo.id,
        courses: [tempCourse]
      }]
      await storeCoursesDownload(userCoursesDownload)
    } else if(list.userIndex!==-1 && list.courseIndex===-1) {
      console.log('type: 1')
      temp[list.userIndex].courses.push(tempCourse)
      await storeCoursesDownload(temp)
    } else {
      console.log('type: 2')
      temp[list.userIndex].courses[list.courseIndex] = tempCourse
      await storeCoursesDownload(temp)
    }

    return tempCourse
  }

  const downloadResumableFileSystem = (url, path, callback) => {
    return FileSystem.createDownloadResumable(url, path, {}, callback);
  }

  const downloadSection = async (data, numberOrder, courseId, token, setDownloadInfo) => {
    const path = FileSystem.documentDirectory + '/itedu/'+ state.userInfo.id + '/' + courseId + '/';
    await FileSystem.makeDirectoryAsync(path, {intermediates: true })

    if(numberOrder===0) {
      await FileSystem.deleteAsync(path + 'overview.mp4', {idempotent: true})
      const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
        setDownloadInfo({lessonName: 'Overview', progress: progress.toFixed(2)})
      };
      let url = '';
      if(data[0].videoUrl) {
        if(data[0].videoUrl.includes("https://youtube.com")) {
          const urls = await ytdl(data[0].videoUrl, {quality: 'highest'})
          url = urls[0].url
        } else {
          url = data[0].videoUrl
        }
        const downloadResumable = downloadResumableFileSystem(url, path + 'overview.mp4', callback)
        try {
          const {uri} = await downloadResumable.downloadAsync()
          data[0].videoPath = uri
          return data
        } catch (e) {
          await FileSystem.deleteAsync(path + 'overview.mp4', {})
          return null
        }
      } else {
        data[0].videoPath = null
        return data
      }
    } else {
      let temp = [...data];
      await FileSystem.deleteAsync(path + downloadId.sectionId, {idempotent: true})
      await FileSystem.makeDirectoryAsync(path + downloadId.sectionId, {intermediates: true })

      for(let i=0; i<temp.length; i++) {
        const callback = (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100
          setDownloadInfo({lessonName: temp[i].name, progress: progress.toFixed(2)})
        };

        try {
          const lessonInfo = await getLessonUrlAndTime(courseId, temp[i].id, token)
          const currentLessonVideoUrl = lessonInfo.data.payload.videoUrl;
          let url = ''
          if(currentLessonVideoUrl.includes("https://youtube.com")) {
            const urls = await ytdl(currentLessonVideoUrl, {quality: 'highest'});
            url = urls[0].url;
          } else {
            url = currentLessonVideoUrl
          }
          const downloadResumable = downloadResumableFileSystem(
              url, path + downloadId.sectionId + '/' + temp[i].id + '.mp4', callback)
          try {
            const { uri } = await downloadResumable.downloadAsync();
            temp[i].videoPath = uri
            temp[i].currentTime = lessonInfo.data.payload.currentTime
          } catch (e) {
            return null
          }
        } catch (e) {
          await FileSystem.deleteAsync(path + downloadId.sectionId, {})
        }
      }

      return temp
    }
  }

  if(startDownload) {
    return <View style={{...styles.container, backgroundColor: theme.foreground1}}>
        <Text style={{color: theme.text, flexShrink: 1}} numberOfLines={1}>{downloadInfo.lessonName}: </Text>
        <Text style={{color: theme.text, width: 60}}>{downloadInfo.progress}%</Text>
    </View>
  } else {
    return null
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#999999',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: 'white'
  }
})
export default DownloadBar;
