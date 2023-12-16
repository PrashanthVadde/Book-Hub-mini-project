import {Component} from 'react'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'
import SideBar from '../SideBar'
import Footer from '../Footer'

import ThemeContext from '../Context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    booksData: [],
    activeBookId: '22526c8e-680e-4419-a041-b05cc239ece4',
    bookCategory: 'ALL',
    searchInput: '',
  }

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {bookCategory, searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookCategory}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
        coverPic: eachBook.cover_pic,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        booksData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = (onUpdateActiveTab, isDarkMode) => {
    const {booksData, searchInput} = this.state

    if (booksData.length === 0) {
      return (
        <div className="nothing-match-page">
          <img
            src="https://res.cloudinary.com/dxjnnbjcx/image/upload/v1702661865/jgmeo0bjivswnawg7qta.jpg"
            alt="no books"
            className="nothing-match-img"
          />
          <p
            className="nothing-match-description"
            style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
          >
            Your search for {searchInput} did not find any matches.
          </p>
        </div>
      )
    }

    return (
      <ul className="shelf-books-container">
        {booksData.map(eachBook => {
          const {id, coverPic, title, authorName, rating, readStatus} = eachBook

          const onClickBook = () => {
            onUpdateActiveTab('')
          }

          return (
            <Link
              to={`/books/${id}`}
              style={{textDecoration: 'none'}}
              onClick={onClickBook}
              key={eachBook.id}
            >
              <li key={eachBook.id}>
                <div className="shelf-book">
                  <img src={coverPic} alt={title} className="shelf-book-img" />
                  <div className="shelf-book-text-part">
                    <h1
                      className="shelf-book-title"
                      style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
                    >
                      {title}
                    </h1>
                    <p
                      className="shelf-book-author-name"
                      style={{color: isDarkMode ? '#9DB2BF' : '#475569'}}
                    >
                      {authorName}
                    </p>
                    <p
                      className="rating"
                      style={{color: isDarkMode ? '#E5B8F4' : '#475569'}}
                    >
                      Avg Rating
                      <BsFillStarFill
                        style={{
                          color: '#FBBF24',
                          marginLeft: 4,
                          marginRight: 4,
                        }}
                      />
                      {rating}
                    </p>
                    <p
                      className="shelf-book-status"
                      style={{color: isDarkMode ? '#DCD7C9' : '#475569'}}
                    >
                      Status:{' '}
                      <span className="shelf-book-read-status">
                        {readStatus}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          )
        })}
        <Footer />
      </ul>
    )
  }

  onClickTryAgainBtn = () => {
    this.getBooksData()
  }

  renderFailureView = isDarkMode => (
    <div className="failure-view">
      <img
        src="https://www.cloudways.com/blog/wp-content/uploads/wordpress-404-error.jpg"
        alt="failure view"
        className="failure-img"
      />
      <p
        className="failure-description"
        style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
      >
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickTryAgainBtn}
      >
        Try Again
      </button>
    </div>
  )

  renderResults = (onUpdateActiveTab, isDarkMode) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView(onUpdateActiveTab, isDarkMode)
      case 'FAILURE':
        return this.renderFailureView(isDarkMode)
      default:
        return null
    }
  }

  onClickTab = (bookId, bookCategory) => {
    this.setState({activeBookId: bookId, bookCategory}, this.getBooksData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getBooksData()
  }

  render() {
    const {bookshelvesList} = this.props
    const {activeBookId, searchInput} = this.state

    const labelObj = bookshelvesList.find(
      eachBook => eachBook.id === activeBookId,
    )

    return (
      <ThemeContext.Consumer>
        {value => {
          const {onUpdateActiveTab, isDarkMode} = value

          return (
            <div
              className="bookshelves-page"
              style={{backgroundColor: isDarkMode ? '#0F0F0F' : '#f5f7fa'}}
            >
              <Header />
              <div className="bottom-part">
                <SideBar
                  bookshelvesList={bookshelvesList}
                  onClickTab={this.onClickTab}
                  activeId={activeBookId}
                />
                <div className="medium-device-styles">
                  <h1
                    className="medium-device-bookshelves-text"
                    style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
                  >
                    Bookshelves
                  </h1>
                  <ul className="medium-device-buttons">
                    {bookshelvesList.map(eachItem => {
                      const classNameForActiveBtn =
                        activeBookId === eachItem.id ? 'active-btn' : ''
                      const onClickMediumDeviceTabBtn = () => {
                        this.onClickTab(eachItem.id, eachItem.value)
                      }
                      return (
                        <li key={eachItem.id}>
                          <button
                            type="button"
                            className={`medium-device-btn-styles ${classNameForActiveBtn}`}
                            onClick={onClickMediumDeviceTabBtn}
                          >
                            {eachItem.label}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="bottom-right-part">
                  <div className="title-search">
                    <h1
                      className="books-category"
                      style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
                    >
                      {' '}
                      {labelObj.label} Books
                    </h1>
                    <div className="search-container">
                      <input
                        type="search"
                        className="search-input"
                        value={searchInput}
                        onChange={this.onChangeSearchInput}
                        style={{
                          backgroundColor: isDarkMode ? '#1A120B' : '#fff',
                          color: isDarkMode ? '#CBE4DE' : '#5a7184',
                          borderColor: isDarkMode ? '#526D82' : '#cbd5e1',
                        }}
                        placeholder="Search"
                      />
                      <button
                        type="button"
                        className="search-icon-container"
                        onClick={this.onClickSearchIcon}
                        style={{
                          backgroundColor: isDarkMode ? '#0C134F' : '#cbd5e1',
                        }}
                        testid="searchButton"
                      >
                        <BsSearch
                          className="search-icon"
                          style={{color: isDarkMode ? '#CBE4DE' : '#1A120B'}}
                        />
                      </button>
                    </div>
                  </div>

                  {this.renderResults(onUpdateActiveTab, isDarkMode)}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Bookshelves
