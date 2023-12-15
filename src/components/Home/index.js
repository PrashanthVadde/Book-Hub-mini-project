import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import './index.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import ThemeContext from '../../Context/ThemeContext'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    booksData: [],
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        authorName: eachBook.author_name,
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

  renderBooks = (onUpdateActiveTab, isDarkMode) => {
    const {booksData} = this.state

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      accessibility: true,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 34,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    const onClickBookItem = () => {
      onUpdateActiveTab('')
    }

    return (
      <div className="slick-container">
        <Slider {...settings}>
          {booksData.map(eachBook => {
            const {id, coverPic, title, authorName} = eachBook
            return (
              <div key={id} className="slider-book-details">
                <Link
                  to={`/books/${id}`}
                  style={{textDecoration: 'none'}}
                  onClick={onClickBookItem}
                >
                  <img
                    src={coverPic}
                    alt={title}
                    className="home-page-cover-pic"
                  />
                  <h1
                    className="home-page-book-title"
                    style={{color: isDarkMode ? '#DDE6ED' : '#334155'}}
                  >
                    {title}
                  </h1>
                  <p
                    className="home-page-author-name"
                    style={{color: isDarkMode ? '#9DB2BF' : '#475569'}}
                  >
                    {authorName}
                  </p>
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    this.getTopRatedBooks()
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
        return this.renderBooks(onUpdateActiveTab, isDarkMode)
      case 'FAILURE':
        return this.renderFailureView(isDarkMode)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {onUpdateActiveTab, isDarkMode} = value

          const onClickFindBooksBtn = () => {
            onUpdateActiveTab('bookshelves')
          }

          return (
            <div
              className="home-page"
              style={{backgroundColor: isDarkMode ? '#0F0F0F' : '#f5f7fa'}}
            >
              <Header />
              <div className="home-content">
                <h1
                  className="home-page-heading"
                  style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
                >
                  Find Your Next Favorite Books?
                </h1>
                <p
                  className="home-page-description"
                  style={{color: isDarkMode ? '#9DB2BF' : '#475569'}}
                >
                  You are in the right place. Tell us what titles or genres you
                  have enjoyed in the past, and we will give you surprisingly
                  insightful recommendations.
                </p>
                <Link
                  to="/shelf"
                  style={{textDecoration: 'none'}}
                  onClick={onClickFindBooksBtn}
                >
                  <button type="button" className="medium-find-books-btn">
                    Find Books
                  </button>
                </Link>

                <div className="top-rated-books-and-footer">
                  <div
                    className="top-rated-books"
                    style={{backgroundColor: isDarkMode ? '#191919' : '#fff'}}
                  >
                    <div className="top-rated-books-top-part">
                      <h1
                        className="top-rated-text"
                        style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
                      >
                        Top Rated Books
                      </h1>
                      <Link
                        to="/shelf"
                        style={{textDecoration: 'none'}}
                        onClick={onClickFindBooksBtn}
                      >
                        <button type="button" className="find-books-btn">
                          Find Books
                        </button>
                      </Link>
                    </div>

                    {this.renderResults(onUpdateActiveTab, isDarkMode)}
                  </div>

                  <Footer />
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
