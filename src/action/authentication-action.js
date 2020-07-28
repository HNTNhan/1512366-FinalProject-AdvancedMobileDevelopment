import {
  apiChangeEmail, apiChangePassword,
  apiForgotPassword,
  apiLogin,
  apiRegister,
  apiUpdateProfile
} from "../core/services/authentication-services";
import {apiUpdateFavoriteCategories} from "../core/services/user-services";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const REGISTER_END = 'REGISTER_END';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
export const FORGOT_PASSWORD_END = 'FORGOT_PASSWORD_END';
export const UPDATE_FAVORITE_CATEGORIES_SUCCESS = 'UPDATE_FAVORITE_CATEGORIES_SUCCESS';
export const UPDATE_FAVORITE_CATEGORIES_FAIL = 'UPDATE_FAVORITE_CATEGORIES_FAIL';
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';
// export const CHANGE_EMAIL_REQUEST = 'CHANGE_EMAIL_REQUEST';
export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS';
export const CHANGE_EMAIL_FAIL = 'CHANGE_EMAIL_FAIL';
// export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';
export const CHANGE_ONLINE_STATUS = 'CHANGE_ONLINE_STATUS';
export const SET_USER_INFO_FROM_STORAGE = 'SET_USER_INFO_FROM_STORAGE';


///////////////////////////////////////////////////////////////////

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data,
    message: 'Login succeeded!',
  }
}
const loginFail = (message) => {
  return {
    type: LOGIN_FAIL,
    message: message
  }
}


const registerSuccess = (message) => {
  return {
    type: REGISTER_SUCCESS,
    message: message
  }
}
const registerFail = (message) => {
  return {
    type: REGISTER_FAIL,
    message: message
  }
}


const forgotPasswordSuccess = (message) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    message: message
  }
}
const forgotPasswordFail = (message) => {
  return {
    type: FORGOT_PASSWORD_FAIL,
    message: message
  }
}


const updateContinueCategoriesSuccess = (data) => {
  return {
    type: UPDATE_FAVORITE_CATEGORIES_SUCCESS,
    data
  }
}
const updateContinueCategoriesFail = (message) => {
  return {
    type: UPDATE_FAVORITE_CATEGORIES_FAIL,
    message: message,
  }
}


const updateProfileSuccess = (data) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    data
  }
}
const updateProfileFail = (message) => {
  return {
    type: UPDATE_PROFILE_FAIL,
    message: message
  }
}

const changeEmailSuccess = (navigation) => {
  return {
    type: CHANGE_EMAIL_SUCCESS,
    navigation: navigation
  }
}
const changeEmailFail = (message) => {
  return {
    type: CHANGE_EMAIL_FAIL,
    message: message
  }
}

const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  }
}
const changePasswordFail = (message) => {
  return {
    type: CHANGE_PASSWORD_FAIL,
    message: message
  }
}
//--------------------------------------------------------------------------//
export const login = (dispatch) => (email, password) => {
  dispatch({type: LOGIN_REQUEST})
  apiLogin(email, password).then(res => {
    if(res.status === 200) {
      dispatch(loginSuccess(res.data))
    } else {
      dispatch(loginFail(res.data.message))
    }
  }).catch(err => {
    dispatch(loginFail(err.response.data.message || err))
  })
}

export const logout = (dispatch) => () => {
  return dispatch({type: LOGOUT_SUCCESS})
}

export const register = (dispatch) => (username, email, phone, password) => {
  dispatch({type: REGISTER_REQUEST})
  apiRegister(username, email, phone, password).then(res => {
    if(res.status === 200) {
      dispatch(registerSuccess(res.data.message))
    } else {
      dispatch(registerFail(res.data.message))
    }
  }).catch(err => {
    dispatch(registerFail(err.response.data.message || err))
  })
}

export const registerEnd = (dispatch) => () => {
  return dispatch({type: REGISTER_END})
}

export const forgotPassword = (dispatch) => (email) => {
  dispatch({type: FORGOT_PASSWORD_REQUEST})
  apiForgotPassword(email).then(res => {
    if(res.status === 200) {
      dispatch(forgotPasswordSuccess(res.data.message))
    } else {
      dispatch(forgotPasswordFail(res.data.message))
    }
  }).catch(err => {
    dispatch(forgotPasswordFail(err.response.data.message || err))
  })
}

export const forgotPasswordEnd = (dispatch) => () => {
  return dispatch({type: FORGOT_PASSWORD_END})
}

export const updateFavoriteCategories = (dispatch) => (token, categoriesIds) => {
  apiUpdateFavoriteCategories(token, categoriesIds).then(res => {
    if(res.status === 200) {
      dispatch(updateContinueCategoriesSuccess({categoriesIds: categoriesIds}))
    } else {
      dispatch(updateContinueCategoriesFail(res.data.message))
    }
  }).catch(err => {
    console.log(err.response.data.message || err)
    dispatch(updateContinueCategoriesFail(err.response.data.message || err))
  })
}

export const updateProfile = (dispatch) => (token, profile) => {
  dispatch({type: UPDATE_PROFILE_REQUEST})
  apiUpdateProfile(token, profile).then(res => {
    if(res.status === 200) {
      dispatch(updateProfileSuccess(res.data))
    } else {
      dispatch(updateProfileFail(res.data.message))
    }
  }).catch(err => {
    dispatch(updateProfileFail(err.response.data.message || err))
  })
}

export const changeEmail = (dispatch) => (token, email) => {
  dispatch({type: UPDATE_PROFILE_REQUEST})
  apiChangeEmail(token, email).then(res => {
    if(res.status === 200) {
      dispatch(changeEmailSuccess())
    } else {
      dispatch(changeEmailFail(res.data.message))
    }
  }).catch(err => {
    dispatch(changeEmailFail(err.response.data.message || err))
  })
}

export const changePassword = (dispatch) => (token, id, password) => {
  dispatch({type: UPDATE_PROFILE_REQUEST})
  apiChangePassword(token, id, password).then(res => {
    if(res.status === 200) {
      dispatch(changePasswordSuccess())
    } else {
      dispatch(changePasswordFail(res.data.message))
    }
  }).catch(err => {
    dispatch(changePasswordFail(err.response.data.message || err))
  })
}

export const changeOnlineStatus = (dispatch) => (status) => {
  dispatch({type: CHANGE_ONLINE_STATUS, data: status})
}

export const setUserInfoFromStorage = (dispatch) => (userInfo) => {
  dispatch({type: SET_USER_INFO_FROM_STORAGE, data: userInfo})
}