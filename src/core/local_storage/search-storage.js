import AsyncStorage from '@react-native-community/async-storage';

export const storeRecentSearch = async (value) => {
  try {
    if(value) {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('.recentSearch', jsonValue)
    } else {
      await AsyncStorage.setItem('.recentSearch', [])
    }
  } catch (e) {
    console.log('err', e)
  }
}


export const getRecentSearch = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('.recentSearch')
    return jsonValue !== null ? {data: JSON.parse(jsonValue), status: 200} : {data: [], status: 200};
  } catch(e) {
    console.log('err', e)
    return {status: 400, data: [], error: e}
  }
}
