import AsyncStorage from '@react-native-community/async-storage';

export const storeChannel = async (value) => {
  try {
    if(value) {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('.channel', jsonValue)
    } else {
      await AsyncStorage.setItem('.channel', [])
    }
  } catch (e) {
    console.log('err', e)
  }
}


export const getChannel = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('.channel')
    return jsonValue !== null ? {data: JSON.parse(jsonValue), status: 200} : {data: [], status: 200};
  } catch(e) {
    console.log('err', e)
    return {status: 400, data: [], error: e}
  }
}
