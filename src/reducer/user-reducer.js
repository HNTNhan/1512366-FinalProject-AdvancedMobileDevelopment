import {
  END_UPDATE_CHANNEL,
  END_UPDATE_CONTINUE_LEARNING_COURSE,
  FAVORITE_COURSES_CHANGE,
  FETCH_CONTINUE_COURSES_FAILED,
  FETCH_CONTINUE_COURSES_REQUEST,
  FETCH_CONTINUE_COURSES_SUCCESS,
  FETCH_FAVORITE_COURSES_FAILED,
  FETCH_FAVORITE_COURSES_REQUEST,
  FETCH_FAVORITE_COURSES_SUCCESS, REQUEST_UPDATE_CHANNEL, REQUEST_UPDATE_CONTINUE_LEARNING_COURSE,
} from "../action/user-action";


export const reducer = (prevState, action) => {
  console.log('user-reducer: ', action.type)
  switch (action.type) {
    case FETCH_CONTINUE_COURSES_REQUEST:
      return {...prevState, continueCouresRequest: true}
    case FETCH_CONTINUE_COURSES_SUCCESS:
      return {...prevState, continueCouresRequest: false, continueCoures: action.data.payload}
    case FETCH_CONTINUE_COURSES_FAILED:
      return {...prevState, continueCouresRequest: false, message: action.message}
    case FETCH_FAVORITE_COURSES_REQUEST:
      return {...prevState, favoriteCoursesRequest: true}
    case FETCH_FAVORITE_COURSES_SUCCESS:
      return {...prevState, favoriteCoursesRequest: false, favoriteCourses: action.data.payload, favoriteCoursesChange: null}
    case FETCH_FAVORITE_COURSES_FAILED:
      return {...prevState, favoriteCoursesRequest: false, message: action.message, favoriteCoursesChange: null}
    case FAVORITE_COURSES_CHANGE:
      return {...prevState, favoriteCoursesChange: action.courseId}
    case REQUEST_UPDATE_CONTINUE_LEARNING_COURSE:
      return {...prevState, isUpdateContinueCourse: true}
    case END_UPDATE_CONTINUE_LEARNING_COURSE:
      return {...prevState, isUpdateContinueCourse: false}
    case REQUEST_UPDATE_CHANNEL:
      return {...prevState, isUpdateChannel: true}
    case END_UPDATE_CHANNEL:
      return {...prevState, isUpdateChannel: false}
    default:
      throw new Error();
  }
}