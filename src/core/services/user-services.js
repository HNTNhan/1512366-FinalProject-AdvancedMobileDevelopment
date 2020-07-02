const axios = require('axios');

export const getContinueCourses = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return await axios.get('https://api.itedu.me/user/get-process-courses', config)
    .then((res) => {
      return res.data.payload
    })
    .catch((err) => {
      return err
    })
}

export const getFavoriteCourses = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return await axios.get('https://api.itedu.me/user/get-favorite-courses', config)
    .then((res) => {
      return res.data.payload
    })
    .catch((err) => {
      return err
    })
}

export const getFavoriteStatus = async (token, courseId) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const url = 'https://api.itedu.me/user/get-course-like-status/' + courseId;

  return await axios.get(url, config)
    .then((res) => {
      return res.data.likeStatus
    })
    .catch((err) => {
      return err
    })
}

export const setFavoriteStatus = async (token, courseId) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return await axios.post('https://api.itedu.me/user/like-course', {courseId: courseId}, config)
    .then((res) => {
      return res.data.likeStatus
    })
    .catch((err) => {
      return err
    })
}