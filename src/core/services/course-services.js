const axios = require('axios');


export const getCoursesTopSell = (page) => {
  return axios.post('https://api.itedu.me/course/top-sell', {limit: 20, page: page*20})
}

export const getCoursesNewRelease = (page) => {
  return axios.post('https://api.itedu.me/course/top-new', {limit: 20, page: page*20})
}

export const searchCourses = (keyword="", attribute="updatedAt", rule='ASC', category=[], time=[], price=[], limit= 20, offset= 0) => {
  const body = {
    keyword: keyword,
    opt: {
      sort: {
        attribute: attribute,
        rule: rule
      },
      category: category,
      time: time,
      price: price
    },
    limit: limit,
    offset: offset
  }

  return axios.post("https://api.itedu.me/course/search", body)
}

export const searchCoursesHasAllParams = (body) => {
  return axios.post("https://api.itedu.me/course/search", body)
}


export const getCourseInfo = (courseId, token) => {
  const config = {
    params: {id: courseId},
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.get('https://api.itedu.me/course/get-course-info', config)
}

export const getCourseAndLessonsDetail = (courseId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.get('https://api.itedu.me/course/detail-with-lesson/'+courseId, config)
}

export const getUserCourseDetail = (courseId, userId) => {
  const url = 'https://api.itedu.me/course/get-course-detail/' + courseId +'/' + userId

  return axios.get(url)
}


