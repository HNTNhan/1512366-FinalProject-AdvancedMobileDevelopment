import React, {useState} from 'react';

const AuthenticationContext = React.createContext({});

const AuthenticationProvider = (props) => {
  const [user, setUser] = useState();

  return <AuthenticationContext.Provider value={{user, setUser}}>
    {props.children}
  </AuthenticationContext.Provider>
};

export {AuthenticationProvider, AuthenticationContext};
