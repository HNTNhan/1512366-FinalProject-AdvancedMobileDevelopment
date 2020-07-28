import React, {useState, useReducer} from 'react';
import {reducer} from "../reducer/user-reducer";
import {favoriteCoursesChange, fetchContinueCourses, fetchFavoriteCourses} from "../action/user-action";

const UserContext = React.createContext({});

const initialState = {
  continueCoures: [],
  continueCouresRequest: false,
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
      favoriteCoursesChange: favoriteCoursesChange(dispatch)
    }}>
    {props.children}
  </UserContext.Provider>
};

export {UserProvider, UserContext};
