const axios = require('axios');

export const getInstructorInfo = (id) => {
  const url = 'https://api.itedu.me/instructor/detail/' + id;

  return axios.get(url)
}

export const getAllInstructor = () => {
  const url = 'https://api.itedu.me/instructor';

  return axios.get(url)
}