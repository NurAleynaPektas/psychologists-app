import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "orange");

  useEffect(() => {
    
    document.documentElement.classList.remove(
      "theme-orange",
      "theme-blue",
      "theme-green"
    );

 
    document.documentElement.classList.add(`theme-${theme}`);


    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
