import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// Creating a new context object
const DarkModeContext = createContext();

// Creating our own custom context provider
function DarkModeProvider({ children }) {
  console.log("DarkModeProvider (context)");

  /*
    window.matchMedia('(prefers-color-scheme: dark)').matches
       |
       |
       |---> 
   
  */

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "mode");

  useEffect(
    function () {
      console.log("DarkModeProvider useEffect");
      if (isDarkMode) {
        //documentElement ---> which is exactly that root (html) element
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//Custom Hook which can be used by components to get access to this context value object.
function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkMode Context was accessed outside's its scope");

  return context;
}

export { DarkModeProvider, useDarkMode };
