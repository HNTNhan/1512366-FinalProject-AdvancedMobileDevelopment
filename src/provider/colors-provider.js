import React, {useState} from 'react';
import {defaultColors} from "../globles/constants";

const ColorsContext = React.createContext({});

const ColorsProvider = (props) => {
  const [checkBackgroundColor, setCheckBackgroundColor] = useState(true);
  let defaultBackgroundColor = checkBackgroundColor ? defaultColors.defaultBackgroundColor.light : defaultColors.defaultBackgroundColor.dark
  
  
  return <ColorsContext.Provider value={{defaultBackgroundColor, checkBackgroundColor, setCheckBackgroundColor: setCheckBackgroundColor}} >
    {props.children}
  </ColorsContext.Provider>
};

export {ColorsProvider, ColorsContext};
