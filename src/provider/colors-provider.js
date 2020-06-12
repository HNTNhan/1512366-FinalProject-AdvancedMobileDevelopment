import React, {useState} from 'react';
import {defaultColors} from "../globles/constants";

const ColorsContext = React.createContext({});

const ColorsProvider = (props) => {
  const [theme, setTheme] = useState(defaultColors.themes.light);

  return <ColorsContext.Provider value={{theme: theme, setTheme: setTheme}} >
    {props.children}
  </ColorsContext.Provider>
};

export {ColorsProvider, ColorsContext};
