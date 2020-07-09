import {apiForgotPassword, apiLogin, apiRegister} from "../core/services/authentication-services";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESSED = 'LOGIN_SUCCESSED';
export const LOGIN_FAILED = 'LOGIN_FAIL';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESSED = 'REGISTER_SUCCESSED';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_END = 'REGISTER_END';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESSED = 'FORGOT_PASSWORD_SUCCESSED';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_END = 'FORGOT_PASSWORD_END';


const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESSED,
    data,
    message: 'Login succeeded!',
  }
}

const loginFail = (message) => {
  return {
    type: LOGIN_FAILED,
    message: message
  }
}

const registerSuccess = (message) => {
  return {
    type: REGISTER_SUCCESSED,
    message: message
  }
}

const registerFail = (message) => {
  return {
    type: REGISTER_FAILED,
    message: message
  }
}

const forgotPasswordSuccess = (message) => {
  return {
    type: FORGOT_PASSWORD_SUCCESSED,
    message: message
  }
}

const forgotPasswordFail = (message) => {
  return {
    type: FORGOT_PASSWORD_FAILED,
    message: message
  }
}

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