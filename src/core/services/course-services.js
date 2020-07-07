const axios = require('axios');


export const getCoursesTopSell = async (page) => {
  return await axios.post('https://api.itedu.me/course/top-sell', {limit: 20, page: page})
}

export const getCoursesNewRelease = async (page) => {
  return await axios.post('https://api.itedu.me/course/top-new', {limit: 20, page: page})
}



export const getCourseInfo = async (courseId, token) => {
  const config = {
    params: {id: courseId},
    headers: { Authorization: `Bearer ${token}` }
  };

  return await axios.get('https://api.itedu.me/course/get-course-info', config)
    .then((res) => {
      return res.data.payload
    })
    .catch((err) => {
      return err
    })
}

export const getUserCourseDetail = async (courseId, userId) => {
  const url = 'https://api.itedu.me/course/get-course-detail/' + courseId +'/' + userId

  return await axios.get(url)
    .then((res) => {
      return res.data.payload
    })
    .catch((err) => {
      return err
    })
}

  export const getCourseAndLessonsDetail = async (courseId, token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    return await axios.get('https://api.itedu.me/course/detail-with-lesson/'+courseId, config)
      .then((res) => {
        return res.data.payload
      })
      .catch((err) => {
        return err
      })
  }