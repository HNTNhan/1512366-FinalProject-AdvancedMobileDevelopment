import {
  CHANGE_EMAIL_FAIL,
  CHANGE_EMAIL_SUCCESS, CHANGE_ONLINE_STATUS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_END,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  //LOGIN_WITH_GOOGLE_FAIL, LOGIN_WITH_GOOGLE_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_END,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS, SET_USER_INFO_FROM_STORAGE,
  UPDATE_FAVORITE_CATEGORIES_FAIL,
  UPDATE_FAVORITE_CATEGORIES_SUCCESS, UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "../action/authentication-action";
import {Alert} from "react-native";

export const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  //isGoogleSignIn: false,
  isRegistered: null,
  isRegistering: false,
  isForgotPassword: null,
  isForgettingPassword: false,
  favoriteCategories: [],
  isUpdatingProfile: false,
  isOnline: false,
  message: null,
  userInfo: null,
  token: null,
}

export const reducer = (prevState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...prevState, isAuthenticating: true}
    case LOGIN_SUCCESS:
      return {...prevState, isAuthenticated: true,  isAuthenticating: false, token: action.data.token, userInfo: action.data.userInfo, message: action.message}
    case LOGIN_FAIL:
      return {...prevState, isAuthenticated: false, isAuthenticating: false, message: action.message}
    case LOGOUT_SUCCESS:
      return initialState
    case REGISTER_REQUEST:
      return {...prevState, isRegistering: true}
    case REGISTER_SUCCESS:
      return {...prevState, isRegistered: true, isRegistering: false, message: action.message}
    case REGISTER_FAIL:
      return {...prevState, isRegistered: false, isRegistering: false, message: action.message}
    case REGISTER_END:
      return {...prevState, isRegistered: null, message: null}
    case FORGOT_PASSWORD_REQUEST:
      return {...prevState, isForgettingPassword: true}
    case FORGOT_PASSWORD_SUCCESS:
      return {...prevState, message: action.message, isForgotPassword: true, isForgettingPassword: false}
    case FORGOT_PASSWORD_FAIL:
      return {...prevState, message: action.message, isForgotPassword: false, isForgettingPassword: false}
    case FORGOT_PASSWORD_END:
      return {...prevState, message: null, isForgotPassword: null}
    case UPDATE_FAVORITE_CATEGORIES_SUCCESS:
      return {...prevState, userInfo: {...prevState.userInfo, favoriteCategories: action.data.categoriesIds || []}}
    case UPDATE_FAVORITE_CATEGORIES_FAIL:
      return {...prevState, message: action.message}
    case UPDATE_PROFILE_REQUEST:
      return {...prevState, isUpdatingProfile: true}
    case UPDATE_PROFILE_SUCCESS:
      Alert.alert('', action.message, [], {cancelable: true})
      return {...prevState, isUpdatingProfile: false, userInfo: action.data.payload}
    case UPDATE_PROFILE_FAIL:
      Alert.alert('', action.message, [], {cancelable: true})
      return {...prevState, isUpdatingProfile: false, message: action.message}
    case CHANGE_EMAIL_SUCCESS:
      Alert.alert('', action.message, [], {cancelable: true})
      return initialState
    case CHANGE_EMAIL_FAIL:
      Alert.alert('', action.message, [], {cancelable: true})
      return {...prevState, isUpdatingProfile: false, message: action.message}
    case CHANGE_PASSWORD_SUCCESS:
      Alert.alert('', action.message, [{}], {cancelable: true})
      return {...prevState, isUpdatingProfile: false}
    case CHANGE_PASSWORD_FAIL:
      Alert.alert('', action.message, [], {cancelable: true})
      return {...prevState, isUpdatingProfile: false, message: action.message}
    case CHANGE_ONLINE_STATUS:
      return {...prevState, isOnline: action.data,}
    case SET_USER_INFO_FROM_STORAGE:
      return {...prevState, userInfo: action.data, isAuthenticated: true}
    default:
      throw new Error();
  }
}