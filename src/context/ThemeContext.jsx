import { createContext } from "react"


// Theme Context oluştur

export const ThemeContext = createContext()


// Theme Provider oluştur

export const ThemeProvider=({children}) => {
// Tema state'i
    const [isDarkMode, setIsDarkMode] = useState()

// Temeyı değiştirecek fonksiyon
    const toggleTheme = () => {}
    


    return <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>{children}</ThemeContext.Provider>
}
