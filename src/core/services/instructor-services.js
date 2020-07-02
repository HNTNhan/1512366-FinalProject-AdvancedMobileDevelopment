const axios = require('axios');

export const getInstructorInfo = async (id) => {
  const url = 'https://api.itedu.me/instructor/detail/' + id

  return await axios.get(url)
    .then((res) => {
      return res.data.payload
    })
    .catch((err) => {
      return err
    })
}