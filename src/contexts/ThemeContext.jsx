import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('theme')));

  useEffect(() => {
    const isDarkLocal = JSON.parse(localStorage.getItem("theme"));
    if (isDarkLocal !== null) {
      setIsDark(isDarkLocal);
    }
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "night" : "winter"
    );
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{isDark,setIsDark}}>
        {children}
    </ThemeContext.Provider>
  )
};