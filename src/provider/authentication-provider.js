import React, {useEffect, useState} from 'react';

const AuthenticationContext = React.createContext({});

const AuthenticationProvider = (props) => {
  const [user, setUser] = useState();
  useEffect(() =>{
    console.log(456)
  }, [user])

  return <AuthenticationContext.Provider value={{user, setUser}}>
    {props.children}
  </AuthenticationContext.Provider>
};

export {AuthenticationProvider, AuthenticationContext};
