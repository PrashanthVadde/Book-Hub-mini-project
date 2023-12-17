import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import ThemeContext from '../Context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookDetails: [],
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`

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
      const responseObj = fetchedData.book_details

      console.log('Book details', responseObj)
      const updatedData = {
        id: responseObj.id,
        coverPic: responseObj.cover_pic,
        title: responseObj.title,
        aboutAuthor: responseObj.about_author,
        aboutBook: responseObj.about_book,
        authorName: responseObj.author_name,
        readStatus: responseObj.read_status,
        rating: responseObj.rating,
      }

      console.log('Updated Book', updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookDetails: updatedData,
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

  renderSuccessView = isDarkMode => {
    const {bookDetails} = this.state
    const {
      coverPic,
      title,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetails

    return (
      <div
        className="book-content"
        style={{backgroundColor: isDarkMode ? '#191919' : '#fff'}}
      >
        <div className="book-details-top-part">
          <img src={coverPic} alt={title} className="book-details-cover-pic" />
          <div className="top-part-text">
            <h1
              className="book-title"
              style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
            >
              {title}
            </h1>
            <p
              className="book-author"
              style={{color: isDarkMode ? '#9DB2BF' : '#475569'}}
            >
              {authorName}
            </p>
            <p
              className="rating-styles"
              //   style={{color: isDarkMode ? '#E5B8F4' : '#475569'}} add
              style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
            >
              Avg Rating{' '}
              <BsFillStarFill
                style={{
                  color: '#FBBF24',
                  marginTop: 4,
                  marginLeft: 4,
                  marginRight: 4,
                }}
              />
              {rating}
              {/* <span
                className="rating-num"
                // style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}} add
              >
                {rating}
              </span> */}
            </p>
            <p
              className="status"
              style={{color: isDarkMode ? '#DCD7C9' : '#475569'}}
            >
              Status: <span className="read-status">{readStatus}</span>
            </p>
          </div>
        </div>

        <hr className="line-styles" />

        <h1
          className="about-author"
          style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
        >
          About Author
        </h1>
        <p
          className="about-author-description"
          style={{color: isDarkMode ? '#9DB2BF' : '#475569'}}
        >
          {aboutAuthor}
        </p>
        <h1
          className="about-book"
          style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
        >
          About Book
        </h1>
        <p
          className="about-book-description"
          style={{color: isDarkMode ? '#9DB2BF' : '#475569'}}
        >
          {aboutBook}
        </p>
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    this.getBookDetails()
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

  renderResults = isDarkMode => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView(isDarkMode)
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
          const {isDarkMode} = value

          return (
            <div
              className="book-details-page"
              style={{backgroundColor: isDarkMode ? '#0F0F0F' : '#f5f7fa'}}
            >
              <Header />
              <div className="book-details-bottom-part">
                {this.renderResults(isDarkMode)}
                <Footer />
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default BookDetails
