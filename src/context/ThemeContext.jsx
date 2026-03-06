import { createContext, useState, useContext, useEffect } from "react";

// Theme Context oluştur

export const ThemeContext = createContext();

// Theme Provider oluştur

export const ThemeProvider = ({ children }) => {

  // Tema state'i
  const [isDarkMode, setIsDarkMode] = useState(() => {

    //eğer localde değer varsa onu kullan
    
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      return localTheme === "dark";
    }
    // Kullanıcının sistem temasını kullan
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Temeyı değiştirecek fonksiyon
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Tema değiştiğinde arayüzü güncelle
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//Custom Hook

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("Provider ile sarmala");
  }
  return context;
};
