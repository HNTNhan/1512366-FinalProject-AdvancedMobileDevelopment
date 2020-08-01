import * as SecureStore from 'expo-secure-store';

export const setStoreUserInfo = async (value) => {
  try {
    if(value) {
      const jsonValue = JSON.stringify(value)
      await SecureStore.setItemAsync('.listUserInfo', jsonValue)
    } else {
      await SecureStore.setItemAsync('.listUserInfo', null)
    }
  } catch (err) {
    console.log('err', err)
  }
}

export const getStoreUserInfo = async () => {
  try {
    const jsonValue = await SecureStore.getItemAsync('.listUserInfo')
    return jsonValue !== null ? {data: JSON.parse(jsonValue), status: 200} : {data: [], status: 200};
  } catch(err) {
    return {status: 400, data: null, err}
  }
}