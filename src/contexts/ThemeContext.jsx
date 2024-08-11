// import { createContext, useEffect, useState } from "react";

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')));

//   useEffect(() => {
//       const themeLocal = JSON.parse(localStorage.getItem('theme'))
//       if(themeLocal !== null){
//         setTheme(themeLocal)
//       }
//       document.documentElement.setAttribute('data-theme',theme ? "dark" : "cupcake")
//     },[theme])

//   return (
//     <ThemeContext.Provider value={{theme,setTheme}}>
//         {children}
//     </ThemeContext.Provider>
//   )
// };