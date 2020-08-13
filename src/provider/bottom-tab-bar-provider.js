import React, {useState} from 'react';

const BottomTabBarContext = React.createContext({});

const BottomTabBarProvider = (props) => {
  const [show, setShow] = useState(true);
  const [tab, setTab] = useState(true)

  return <BottomTabBarContext.Provider value={{show: show, setShow: setShow, tab: tab, setTab: setTab}}>
    {props.children}
  </BottomTabBarContext.Provider>
};

export {BottomTabBarProvider, BottomTabBarContext};
