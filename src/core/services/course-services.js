const axios = require('axios');


export const getCoursesTopSell = (page, limit= 20) => {
  return axios.post('https://api.itedu.me/course/top-sell', {limit: limit, page: page+1})
}

export const getCoursesNewRelease = (page, limit= 20) => {
  return axios.post('https://api.itedu.me/course/top-new', {limit: limit, page: page+1})
}

export const getCoursesTopRate = (page, limit= 20) => {
  return axios.post('https://api.itedu.me/course/top-rate', {limit: limit, page: page+1})
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

export const getCourseProcess = (courseId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.get('https://api.itedu.me/course/process-course/' + courseId, config)
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

export const getLastWatchedLesson = (courseId, token) => {
  const url = 'https://api.itedu.me/course/last-watched-lesson/' + courseId
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.get(url, config)
}

export const getRating = (courseId, token) => {
  const uri = 'https://api.itedu.me/course/get-rating/' + courseId;

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.get(uri, config)
}

export const ratingCourse = (courseId, formalityPoint, contentPoint, presentationPoint, content, token) => {
  const data = {
    courseId: courseId,
    formalityPoint: formalityPoint,
    contentPoint: contentPoint,
    presentationPoint: presentationPoint,
    content: content
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.post("https://api.itedu.me/course/rating-course", data, config)
}