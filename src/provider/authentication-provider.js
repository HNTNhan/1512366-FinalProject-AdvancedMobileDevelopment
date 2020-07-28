import React, {useState, useReducer} from 'react';
import {reducer} from "../reducer/authentication-reducer";
import {
  changeEmail, changeOnlineStatus, changePassword,
  forgotPassword,
  forgotPasswordEnd,
  login, logout,
  register,
  registerEnd, setUserInfoFromStorage,
  updateFavoriteCategories, updateProfile
} from "../action/authentication-action";

const AuthenticationContext = React.createContext({});

export const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  isRegistered: null,
  isRegistering: false,
  isForgotPassword: null,
  isForgettingPassword: false,
  isUpdatingProfile: false,
  isOnline: false,
  message: null,
  userInfo: null,
  token: null,
}

const AuthenticationProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState({});

  return <AuthenticationContext.Provider
    value={{user: user, setUser: setUser,
      state, login: login(dispatch), logout: logout(dispatch),
      changeOnlineStatus: changeOnlineStatus(dispatch), setUserInfoFromStorage: setUserInfoFromStorage(dispatch),
      register: register(dispatch), registerEnd: registerEnd(dispatch),
      forgotPassword: forgotPassword(dispatch), forgotPasswordEnd: forgotPasswordEnd(dispatch),
      updateFavoriteCategories: updateFavoriteCategories(dispatch),
      updateProfile: updateProfile(dispatch), changeEmail: changeEmail(dispatch), changePassword: changePassword(dispatch)}}>
    {props.children}
  </AuthenticationContext.Provider>
};

export {AuthenticationProvider, AuthenticationContext};
