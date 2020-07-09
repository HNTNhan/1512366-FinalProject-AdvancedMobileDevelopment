import {
  FORGOT_PASSWORD_END,
  FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESSED,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESSED, REGISTER_END,
  REGISTER_FAILED, REGISTER_REQUEST,
  REGISTER_SUCCESSED,
} from "../action/authentication-action";

export const reducer = (prevState, action) => {
  console.log('reducer: ', action.type)
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...prevState, isAuthenticating: true}
    case LOGIN_SUCCESSED:
      return {...prevState, isAuthenticated: true,  isAuthenticating: false, token: action.data.token, userInfo: action.data.userInfo, message: action.message}
    case LOGIN_FAILED:
      return {...prevState, isAuthenticated: false, isAuthenticating: false, message: action.message}
    case REGISTER_REQUEST:
      return {...prevState, isRegistering: true}
    case REGISTER_SUCCESSED:
      return {...prevState, isRegistered: true, isRegistering: false, message: action.message}
    case REGISTER_FAILED:
      return {...prevState, isRegistered: false, isRegistering: false, message: action.message}
    case REGISTER_END:
      return {...prevState, isRegistered: null, message: null}
    case FORGOT_PASSWORD_REQUEST:
      return {...prevState, isForgettingPassword: true}
    case FORGOT_PASSWORD_SUCCESSED:
      return {...prevState, message: action.message, isForgotPassword: true, isForgettingPassword: false}
    case FORGOT_PASSWORD_FAILED:
      return {...prevState, message: action.message, isForgotPassword: false, isForgettingPassword: false}
    case FORGOT_PASSWORD_END:
      return {...prevState, message: null, isForgotPassword: null}
    default:
      throw new Error();
  }
}