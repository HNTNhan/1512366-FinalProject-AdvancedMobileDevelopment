import React, {useState} from 'react';

const BottomTabBarContext = React.createContext({});

const BottomTabBarProvider = (props) => {
  const [show, setShow] = useState(true);

  return <BottomTabBarContext.Provider value={{show: show, setShow: setShow}}>
    {props.children}
  </BottomTabBarContext.Provider>
};

export {BottomTabBarProvider, BottomTabBarContext};
