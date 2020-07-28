import * as SecureStore from 'expo-secure-store';

export const setStoreUserInfo = async (value) => {
  try {
    if(value) {
      const jsonValue = JSON.stringify(value)
      await SecureStore.setItemAsync('.userInfo', jsonValue)
    } else {
      await SecureStore.setItemAsync('.userInfo', null)
    }
  } catch (e) {
    console.log('err', e)
  }
}

export const getStoreUserInfo = async () => {
  try {
    const jsonValue = await SecureStore.getItemAsync('.userInfo')
    return jsonValue !== null ? {data: JSON.parse(jsonValue), status: 200} : {data: null, status: 200};
  } catch(e) {
    return {status: 400, data: null}
  }
}