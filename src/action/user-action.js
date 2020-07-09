import {apiFetchContinueCourses, apiFetchFavoriteCourses} from "../core/services/user-services";

export const FETCH_CONTINUE_COURSES_REQUEST = 'FETCH_CONTINUE_LEARNING_REQUEST'
export const FETCH_CONTINUE_COURSES_SUCCESSED = 'FETCH_CONTINUE_LEARNING_SUCCESSED'
export const FETCH_CONTINUE_COURSES_FAILED = 'FETCH_CONTINUE_LEARNING_FAILED'
export const FETCH_FAVORITE_COURSES_REQUEST = 'FETCH_FAVORITE_COURSES_REQUEST'
export const FETCH_FAVORITE_COURSES_SUCCESSED = 'FETCH_FAVORITE_COURSES_SUCCESSED'
export const FETCH_FAVORITE_COURSES_FAILED = 'FETCH_FAVORITE_COURSES_FAILED'
export const FAVORITE_COURSES_CHANGE = 'FAVORITE_COURSES_CHANGE'


const fetchContinueCoursesSuccess = (data) => {
  return {
    type: FETCH_CONTINUE_COURSES_SUCCESSED,
    data,
  }
}

const fetchContinueCoursesFail = (message) => {
  return {
    type: FETCH_CONTINUE_COURSES_SUCCESSED,
    message: message,
  }
}

const fetchFavoriteCoursesSuccess = (data) => {
  return {
    type: FETCH_FAVORITE_COURSES_SUCCESSED,
    data,
  }
}

const fetchFavoriteCoursesFail = (message) => {
  return {
    type: FETCH_FAVORITE_COURSES_FAILED,
    message: message,
  }
}

export const fetchContinueCourses = (dispatch) => (token) => {
  dispatch({type: FETCH_CONTINUE_COURSES_REQUEST})
  apiFetchContinueCourses(token).then(res => {
    if(res.status === 200) {
      dispatch(fetchContinueCoursesSuccess(res.data))
    } else {
      dispatch(fetchContinueCoursesFail(res.data.message))
    }
  }).catch(err => {
    dispatch(fetchContinueCoursesFail(err.response.data.message || err))
  })
}

export const fetchFavoriteCourses = (dispatch) => (token) => {
  dispatch({type: FETCH_FAVORITE_COURSES_REQUEST})
  apiFetchFavoriteCourses(token).then(res => {
    if(res.status === 200) {
      dispatch(fetchFavoriteCoursesSuccess(res.data))
    } else {
      dispatch(fetchFavoriteCoursesFail(res.data.message))
    }
  }).catch(err => {
    dispatch(fetchFavoriteCoursesFail(err.response.data.message || err))
  })
}

export const favoriteCoursesChange = (dispatch) => (courseId) => {
  dispatch({
    type: FAVORITE_COURSES_CHANGE,
    courseId: courseId
  })
}