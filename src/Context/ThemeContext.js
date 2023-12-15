import React from 'react'

const ThemeContext = React.createContext({
  isDarkMode: true,
  onToggleTheme: () => {},
  activeTab: 'home',
  onUpdateActiveTab: () => {},
})

export default ThemeContext
