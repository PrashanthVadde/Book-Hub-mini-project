import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

import Header from '../Header'
import SideBar from '../SideBar'

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
  }

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    // const {searchText} = this.state

    const apiUrl = 'https://apis.ccbp.in/book-hub/books?shelf=Read&search=Luke'
    const jwtToken = Cookies.get('jwt_token')

    console.log('Jwt token:-', jwtToken)

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
      console.log('Fetched Data:-', fetchedData)
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {booksData} = this.state
    return (
      <h1 className="books-data">
        {booksData.map(eachBook => (
          <h1>{eachBook.title}</h1>
        ))}
      </h1>
    )
  }

  onClickTryAgainBtn = () => {
    this.getBooksData()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://www.cloudways.com/blog/wp-content/uploads/wordpress-404-error.jpg"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-description">
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

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {bookshelvesList} = this.props

    return (
      <div className="bookshelves-page">
        <Header />
        <div className="bottom-part">
          <SideBar bookshelvesList={bookshelvesList} />
          <div className="bottom-right-part">
            <div className="title-search">
              <h1 className="books-category">All Books</h1>
              <div className="search-container">
                <input type="search" className="search-input" />
                <div className="search-icon-container">
                  <BsSearch className="search-icon" />
                </div>
              </div>
            </div>

            {this.renderResults()}
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
