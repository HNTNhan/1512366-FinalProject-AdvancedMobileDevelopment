import React, {useState, useReducer} from 'react';
import {reducer} from "../reducer/authentication-reducer";
import {forgotPassword, forgotPasswordEnd, login, register, registerEnd} from "../action/authentication-action";

const AuthenticationContext = React.createContext({});

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  isRegistered: null,
  isRegistering: false,
  isForgotPassword: null,
  message: null,
  userInfo: null,
  token: null,
}

const AuthenticationProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState({});

  return <AuthenticationContext.Provider
    value={{user: user, setUser: setUser, state, login: login(dispatch),
      register: register(dispatch), registerEnd: registerEnd(dispatch), forgotPassword: forgotPassword(dispatch), forgotPasswordEnd: forgotPasswordEnd(dispatch)}}>
    {props.children}
  </AuthenticationContext.Provider>
};

export {AuthenticationProvider, AuthenticationContext};
