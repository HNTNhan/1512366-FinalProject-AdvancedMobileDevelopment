import React, {useEffect, useState} from 'react';

const AuthenticationContext = React.createContext({});

const AuthenticationProvider = (props) => {
  const [user, setUser] = useState({});
  const [user1, setUser1] = useState({});

  return <AuthenticationContext.Provider value={{user: user, setUser: setUser, user1: user1, setUser1: setUser1}}>
    {props.children}
  </AuthenticationContext.Provider>
};

export {AuthenticationProvider, AuthenticationContext};
