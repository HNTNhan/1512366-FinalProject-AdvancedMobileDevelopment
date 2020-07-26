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

export const downloadSection = async (data, numberOrder, courseId, token, setProgress) => {
  if(numberOrder===0) {
    const callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
      setProgress(progress.toFixed(2))
      //setDownloadInfo({lessonName: 'Overview', progress: progress.toFixed(2)})
      console.log(progress.toFixed(2) + '%')
    };

    if(data[0].videoUrl.includes("https://youtube.com")) {
      const urls = await ytdl(data[0].videoUrl, { quality: 'highest' });
      const downloadResumable = FileSystem.createDownloadResumable(
        urls[0].url,
        FileSystem.documentDirectory + courseId + 'overview' + '.mp4',
        {},
        callback
      );

      //setIsDownloading(true)
      const { uri } = await downloadResumable.downloadAsync()
      data[0].videoUrl = uri
      //setIsDownloading(false)
      //await saveFile(uri)
      return data
    }
    else {
      const downloadResumable = FileSystem.createDownloadResumable(
        data[0].videoUrl,
        FileSystem.documentDirectory + courseId + 'Overview' + '.mp4',
        {},
        callback
      );

      //setIsDownloading(true)
      const { uri } = await downloadResumable.downloadAsync()
      data[0].videoUrl = uri
      //setIsDownloading(false)
      //await saveFile(uri)
      return data
    }
  } else {
    let temp = [...data];
    for(let i=0; i<2; i++) {
      const callback = (downloadProgress) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
        // setDownloadInfo({lessonName: temp[i].name, progress: progress.toFixed(2)})
        console.log(progress.toFixed(2) + '%')
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
          // setIsDownloading(true)
          const { uri } = await downloadResumable.downloadAsync();
          temp[i].videoUrl = uri
          // setIsDownloading(false)
          //await saveFile(uri)
          console.log(uri)
        }
        else {
          const downloadResumable = FileSystem.createDownloadResumable(
            currentLessonVideoUrl,
            FileSystem.documentDirectory + courseId + temp[i].id + '.mp4',
            {},
            callback
          );

          // setIsDownloading(true)
          const { uri } = await downloadResumable.downloadAsync();
          temp[i].videoUrl = uri
          // setIsDownloading(false)
          //await saveFile(uri)
          console.log(uri)
        }
      } catch (e) { console.log(e) }
    }
    return temp
  }
}