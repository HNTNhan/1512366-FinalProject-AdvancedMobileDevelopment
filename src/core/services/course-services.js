const axios = require('axios');


export const getCoursesTopSell = (page) => {
  return axios.post('https://api.itedu.me/course/top-sell', {limit: 20, page: page*20})
}

export const getCoursesNewRelease = (page) => {
  return axios.post('https://api.itedu.me/course/top-new', {limit: 20, page: page*20})
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

export const getUserCourseDetail = (courseId, userId) => {
  const url = 'https://api.itedu.me/course/get-course-detail/' + courseId +'/' + userId

  return axios.get(url)
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