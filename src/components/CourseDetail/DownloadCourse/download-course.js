import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import ytdl from "react-native-ytdl"
import {getLessonUrlAndTime} from "../../../core/services/lesson-services";


const saveFile = async (fileUri) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    const asset = await MediaLibrary.createAssetAsync(fileUri)
    await MediaLibrary.createAlbumAsync("IT_EDU", asset, false)
  } else {}
}

export const downloadCourse = (data) => {

}

export const downloadSection = async (data, numberOrder, courseId, token, setDownloadInfo, setIsDownloading) => {
  if(numberOrder===0) {
    setIsDownloading(true)
    const callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
      console.log(progress.toFixed(2) + '%')
      const now = new Date()
      if(now.getTime()%2000<=100 || downloadProgress.totalBytesWritten === downloadProgress.totalBytesExpectedToWrite) {
        setDownloadInfo({lessonName: 'Overview', progress: progress.toFixed(2)})
      } else {}
    };

    if(data[0].videoUrl.includes("https://youtube.com")) {
      const urls = await ytdl(data[0].videoUrl, { quality: 'highest' });
      const downloadResumable = FileSystem.createDownloadResumable(
        urls[0].url,
        FileSystem.documentDirectory + courseId + 'overview' + '.mp4',
        {},
        callback
      );

      try {
        const {uri} = await downloadResumable.downloadAsync()
        data[0].videoUrl = uri
        setTimeout(() => {
          setIsDownloading(false)
          setDownloadInfo({lessonName: 'Overview', progress: 0})

        }, 5000)
        return data
      } catch (e) {
        console.log(e)
        setIsDownloading(false)
        setDownloadInfo({lessonName: 'Overview', progress: 0})
      }
      //await saveFile(uri)

    }
    else {
      const downloadResumable = FileSystem.createDownloadResumable(
        data[0].videoUrl,
        FileSystem.documentDirectory + courseId + 'Overview' + '.mp4',
        {},
        callback
      );

      try {
        const {uri} = await downloadResumable.downloadAsync()
        data[0].videoUrl = uri
        setIsDownloading(false)
        setDownloadInfo({lessonName: '', progress: 0})
        //await saveFile(uri)
        return data
      } catch (e) {
        setTimeout(() => {
          setIsDownloading(false)
          setDownloadInfo({lessonName: '', progress: 0})
        }, 5000)
      }

    }
  } else {
    let temp = [...data];
    for(let i=0; i<temp.length; i++) {
      setIsDownloading(true)
      const callback = (downloadProgress) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
        console.log(progress.toFixed(2) + '%')
        const now = new Date()
        if(now.getTime()%2000<=100 || downloadProgress.totalBytesWritten === downloadProgress.totalBytesExpectedToWrite) {
          setDownloadInfo({lessonName: temp[i].name, progress: progress.toFixed(2)})
        } else {}
      };

      try {
        const currentLessonVideoUrl = (await getLessonUrlAndTime(courseId, temp[i].id, token)).data.payload.videoUrl;

        if(currentLessonVideoUrl.includes("https://youtube.com")) {
          const urls = await ytdl(currentLessonVideoUrl, { quality: 'highest' });
          const downloadResumable = FileSystem.createDownloadResumable(
            urls[0].url,
            FileSystem.documentDirectory + courseId + temp[i].id + '.mp4',
            {},
            callback
          );

          try {
            const { uri } = await downloadResumable.downloadAsync();
            temp[i].videoUrl = uri
          } catch (e) {

          }

          //await saveFile(uri)
        }
        else {
          const downloadResumable = FileSystem.createDownloadResumable(
            currentLessonVideoUrl,
            FileSystem.documentDirectory + courseId + temp[i].id + '.mp4',
            {},
            callback
          );

          try {
            const { uri } = await downloadResumable.downloadAsync();
            temp[i].videoUrl = uri
            //await saveFile(uri)
          } catch (e) {

          }

        }
      } catch (e) { console.log(e) }
    }

    setIsDownloading(false)
    setDownloadInfo({lessonName: '', progress: 0})

    return temp
  }
}