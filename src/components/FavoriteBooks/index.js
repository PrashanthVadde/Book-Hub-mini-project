import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import ThemeContext from '../Context/ThemeContext'

import Header from '../Header'

import './index.css'

const FavoriteBooks = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMode, favoriteBooks} = value

      console.log('Favorite Books ###### ', favoriteBooks)

      if (favoriteBooks.length === 0) {
        return (
          <div
            className="favorite-books-page"
            style={{
              backgroundColor: isDarkMode ? '#0F0F0F' : '#f5f7fa',
            }}
          >
            <Header />

            <div className="no-favorite-books-page">
              <h1 className="no-favorite-books-text">
                No Favorite Books Found
              </h1>
              <p
                className="no-favorite-books-description"
                style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
              >
                If you want you can make as favorite by clicking on{' '}
                <span style={{color: 'red'}}>Heart-Icon</span> in Book details
              </p>
            </div>
          </div>
        )
      }

      return (
        <div
          className="favorite-books-page"
          style={{backgroundColor: isDarkMode ? '#0F0F0F' : '#f5f7fa'}}
        >
          <Header />
          <div className="favorite-books-bottom-part">
            <h1 className="favorite-books-title">Favorite Books </h1>
            <ul className="favorite-book-items-container">
              {favoriteBooks.map(eachBook => (
                <Link
                  to={`/books/${eachBook.id}`}
                  style={{textDecoration: 'none'}}
                >
                  <li key={eachBook.id} className="favorite-book-item">
                    <img
                      src={eachBook.coverPic}
                      alt="book"
                      className="favorite-book-cover-pic"
                    />

                    <div>
                      <h1
                        className="favorite-book-title"
                        style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
                      >
                        {eachBook.title}
                      </h1>
                      <p
                        className="favorite-book-author-name"
                        style={{color: isDarkMode ? '#9DB2BF' : '#475569'}}
                      >
                        {eachBook.authorName}
                      </p>
                      <p
                        className="favorite-book-rating"
                        style={{color: isDarkMode ? '#E5B8F4' : '#475569'}}
                      >
                        Avg rating{' '}
                        <BsFillStarFill size={15} style={{color: '#FFB534'}} />{' '}
                        {eachBook.rating}
                      </p>
                      <p
                        className="favorite-book-read-status"
                        style={{color: isDarkMode ? '#DCD7C9' : '#475569'}}
                      >
                        Status:{' '}
                        <span style={{color: '#3559E0'}}>
                          {eachBook.readStatus}
                        </span>
                      </p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default FavoriteBooks
