const axios = require('axios');

export const getAllCategory= () => {
  return axios.get('https://api.itedu.me/category/all')
}
