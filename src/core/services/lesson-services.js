const axios = require('axios');


export const getLessonDetail = (courseId, lessonId, token) => {
  const url = 'https://api.itedu.me/lesson/detail/' + courseId + '/' + lessonId;
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios.get(url, config)
}

export const getLessonUrlAndTime = (courseId, lessonId, token) => {
  const url = 'https://api.itedu.me/lesson/video/' + courseId + '/' + lessonId;
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios.get(url, config)
}


export const getLessonSubtitle = (courseId, lessonId, token) => {
  const url = 'https://api.itedu.me/lesson/subtitle/' + courseId + '/' + lessonId;
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios.get(url, config)
}

export const finishLesson = (lessonId, token) => {
  const url = 'https://api.itedu.me/lesson/update-status';
  const data = {
    lessonId: lessonId
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios.post(url, data, config)
}

export const updateVideoTime = (currentTime, lessonId, token) => {
  const url = 'https://api.itedu.me​/lesson​/update-current-time-learn-video';
  const data = {
    lessonId: lessonId,
    currentTime: currentTime
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios.post(url, data, config)
}