import React from 'react'

const ThemeContext = React.createContext({
  isDarkMode: false,
  onToggleTheme: () => {},
  activeTab: 'home',
  onUpdateActiveTab: () => {},
  favoriteBooks: [],
  onUpdateFavoriteBooks: () => {},
})

export default ThemeContext
