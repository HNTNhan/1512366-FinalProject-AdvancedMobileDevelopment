import AsyncStorage from '@react-native-community/async-storage';

export const storeCoursesDownload = async (value) => {
  try {
    if(value) {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('.coursesDownload', jsonValue)
    } else {
      await AsyncStorage.setItem('.coursesDownload', null)
    }
  } catch (e) {
    console.log('err', e)
  }
}


export const getCoursesDownload = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('.coursesDownload')
    return jsonValue !== null ? {data: JSON.parse(jsonValue), status: 200} : {data: [], status: 200};
  } catch(e) {
    return {status: 400, data: [], error: e}
  }
}
