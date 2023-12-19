import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'
import FavoriteBooks from './components/FavoriteBooks'

import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import ThemeContext from './components/Context/ThemeContext'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class App extends Component {
  state = {
    activeTab: 'home',
    isDarkMode: false,
    favoriteBooks: [],
  }

  onUpdateActiveTab = tabValue => {
    this.setState({activeTab: tabValue})
  }

  onToggleTheme = () => {
    this.setState(prevState => ({isDarkMode: !prevState.isDarkMode}))
  }

  onUpdateFavoriteBooks = bookDetails => {
    const {favoriteBooks} = this.state

    const isItemAlreadyPresent = favoriteBooks.some(
      eachBookDetails => eachBookDetails.id === bookDetails.id,
    )

    console.log('isItemAlreadyPresent', isItemAlreadyPresent)

    if (isItemAlreadyPresent) {
      const filteredFavoriteBooks = favoriteBooks.filter(
        eachBook => eachBook.id !== bookDetails.id,
      )
      this.setState({favoriteBooks: filteredFavoriteBooks})
    } else {
      this.setState(prevState => ({
        favoriteBooks: [...prevState.favoriteBooks, bookDetails],
      }))
    }
  }

  render() {
    const {isDarkMode, activeTab, favoriteBooks} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDarkMode,
          onToggleTheme: this.onToggleTheme,
          activeTab,
          onUpdateActiveTab: this.onUpdateActiveTab,
          favoriteBooks,
          onUpdateFavoriteBooks: this.onUpdateFavoriteBooks,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/shelf"
            component={() => <Bookshelves bookshelvesList={bookshelvesList} />}
          />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <ProtectedRoute
            exact
            path="/favorite-books"
            component={FavoriteBooks}
          />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
