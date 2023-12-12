import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import './index.css'

// import '~slick-carousel/slick/slick.css'
// import '~slick-carousel/slick/slick-theme.css'

import Header from '../Header'

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

  renderBooks = () => {
    const {booksData} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
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

    return (
      <div className="slick-container">
        <Slider {...settings}>
          {booksData.map(eachBook => {
            const {id, coverPic, title, authorName} = eachBook
            return (
              <div key={id} className="book-details">
                <img src={coverPic} alt={title} className="cover-pic" />
                <h1 className="book-title">{title}</h1>
                <p className="author-name">{authorName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderFailureView = () => <h1>Failed</h1>

  renderResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderBooks()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-page">
        <Header />
        <div className="home-content">
          <h1 className="home-page-heading">Find Your Next Favorite Books?</h1>
          <p className="description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="top-rated-books">
            <div className="top-part">
              <h1 className="top-rated-text">Top Rated Books</h1>
              <Link to="/shelf" styles={{textDecoration: 'none'}}>
                <button type="button" className="find-books-btn">
                  Find Books
                </button>
              </Link>
            </div>

            {this.renderResults()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
