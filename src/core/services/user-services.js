const axios = require('axios');

export const apiFetchContinueCourses = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios.get('https://api.itedu.me/user/get-process-courses', config)
}

export const apiFetchFavoriteCourses = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios.get('https://api.itedu.me/user/get-favorite-courses', config)
}

export const getFavoriteStatus = (token, courseId) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const url = 'https://api.itedu.me/user/get-course-like-status/' + courseId;

  return axios.get(url, config)
}

export const setFavoriteStatus = (token, courseId) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.post('https://api.itedu.me/user/like-course', {courseId: courseId}, config)
}

export const checkOwnCourse = (token, courseId) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.get('https://api.itedu.me/user/check-own-course/' + courseId, config)
}

export const apiUpdateFavoriteCategories = (token, categoryIds) => {
  const body = {
    categoryIds: categoryIds
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.put('https://api.itedu.me/user/update-favorite-categories', body, config)
}

export const apiSendFeedback = (token, feedback) => {
  const body = {
    subject: feedback.subject,
    content: feedback.content
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.post('https://api.itedu.me/feedback/create', body, config)
}