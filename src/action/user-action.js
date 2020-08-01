import {
  apiFetchContinueCourses,
  apiFetchFavoriteCourses,
} from "../core/services/user-services";

export const FETCH_CONTINUE_COURSES_REQUEST = 'FETCH_CONTINUE_LEARNING_REQUEST';
export const FETCH_CONTINUE_COURSES_SUCCESS = 'FETCH_CONTINUE_LEARNING_SUCCESS';
export const FETCH_CONTINUE_COURSES_FAILED = 'FETCH_CONTINUE_LEARNING_FAILED';
export const FETCH_FAVORITE_COURSES_REQUEST = 'FETCH_FAVORITE_COURSES_REQUEST';
export const FETCH_FAVORITE_COURSES_SUCCESS = 'FETCH_FAVORITE_COURSES_SUCCESS';
export const FETCH_FAVORITE_COURSES_FAILED = 'FETCH_FAVORITE_COURSES_FAILED';
export const FAVORITE_COURSES_CHANGE = 'FAVORITE_COURSES_CHANGE';
export const REQUEST_UPDATE_CONTINUE_LEARNING_COURSE = 'REQUEST_UPDATE_CONTINUE_LEARNING_COURSE';
export const END_UPDATE_CONTINUE_LEARNING_COURSE = 'END_UPDATE_CONTINUE_LEARNING_COURSE';
export const REQUEST_UPDATE_CHANNEL = 'REQUEST_UPDATE_CHANNEL';
export const END_UPDATE_CHANNEL = 'END_UPDATE_CHANNEL';




const fetchContinueCoursesSuccess = (data) => {
  return {
    type: FETCH_CONTINUE_COURSES_SUCCESS,
    data,
  }
}

const fetchContinueCoursesFail = (message) => {
  return {
    type: FETCH_CONTINUE_COURSES_SUCCESS,
    message: message,
  }
}

const fetchFavoriteCoursesSuccess = (data) => {
  return {
    type: FETCH_FAVORITE_COURSES_SUCCESS,
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

export const requestUpdateContinueLearning = (dispatch) => () => {
  dispatch({ type: REQUEST_UPDATE_CONTINUE_LEARNING_COURSE })
}

export const endUpdateContinueLearning = (dispatch) => () => {
  dispatch({ type: END_UPDATE_CONTINUE_LEARNING_COURSE })
}

export const requestUpdateChannel = (dispatch) => () => {
  dispatch({ type: REQUEST_UPDATE_CHANNEL })
}

export const endUpdateChanel = (dispatch) => () => {
  dispatch({ type: END_UPDATE_CHANNEL })
}