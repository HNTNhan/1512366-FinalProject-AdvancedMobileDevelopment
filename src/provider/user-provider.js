import React, {useState, useReducer} from 'react';
import {reducer} from "../reducer/user-reducer";
import {
  endUpdateChanel,
  endUpdateContinueLearning,
  favoriteCoursesChange,
  fetchContinueCourses,
  fetchFavoriteCourses, requestUpdateChannel,
  requestUpdateContinueLearning
} from "../action/user-action";

const UserContext = React.createContext({});

const initialState = {
  continueCoures: [],
  continueCouresRequest: false,
  isUpdateContinueCourse: false,
  isUpdateChannel: true,
  favoriteCourses: [],
  favoriteCoursesRequest: false,
  favoriteCoursesChange: false,
  message: null,
}

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider
    value={{
      state, fetchContinueCourses: fetchContinueCourses(dispatch),
      fetchFavoriteCourses: fetchFavoriteCourses(dispatch),
      favoriteCoursesChange: favoriteCoursesChange(dispatch),
      requestUpdateContinueLearning: requestUpdateContinueLearning(dispatch),
      endUpdateContinueLearning: endUpdateContinueLearning(dispatch),
      requestUpdateChannel: requestUpdateChannel(dispatch),
      endUpdateChanel: endUpdateChanel(dispatch)
    }}>
    {props.children}
  </UserContext.Provider>
};

export {UserProvider, UserContext};
