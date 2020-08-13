import React, {useState} from 'react';
import {defaultLanguage} from "../globles/languages";

const LanguageContext = React.createContext({});

const LanguageProvider = (props) => {
  const [language, setLanguage] = useState(defaultLanguage.Vietnamese);

  return <LanguageContext.Provider value={{language: language, setLanguage: setLanguage}} >
    {props.children}
  </LanguageContext.Provider>
};

export {LanguageProvider, LanguageContext};
