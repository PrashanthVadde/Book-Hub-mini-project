import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'
import ThemeContext from '../Context/ThemeContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    showingError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = isDarkMode => {
    const {username} = this.state

    return (
      <div className="input-container">
        <label
          className={`username-light ${isDarkMode ? 'username-dark' : ''}`}
          htmlFor="userName"
          //   style={{color: isDarkMode ? '#CBE4DE' : '#5a7184'}}
        >
          Username*
        </label>
        <input
          className="input-styles"
          id="userName"
          value={username}
          onChange={this.onChangeUsername}
          style={{color: isDarkMode ? '#CBE4DE' : '#5a7184'}}
        />
      </div>
    )
  }

  renderPasswordField = isDarkMode => {
    const {password} = this.state

    return (
      <div className="input-container">
        <label
          className={`username-light ${isDarkMode ? 'username-dark' : ''}`}
          htmlFor="password"
          style={{color: isDarkMode ? '#CBE4DE' : '#5a7184'}}
        >
          Password*
        </label>
        <input
          type="password"
          className="input-styles"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          style={{color: isDarkMode ? '#CBE4DE' : '#5a7184'}}
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({errMsg, showingError: true})
  }

  onSubmitForm = async event => {
    const {username, password} = this.state

    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showingError, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value

          return (
            <div
              //   className={isDarkMode ? 'login-page-dark' : 'login-page-light'}
              className={`login-page-light ${
                isDarkMode ? 'login-page-dark' : ''
              }`}
            >
              <img
                src="https://res.cloudinary.com/dazvrkjxg/image/upload/v1702279962/b60dhv585bj2cswowvs6.jpg"
                alt="website login"
                className="website-login-img"
              />
              <form
                className={`form-container-light ${
                  isDarkMode ? 'form-container-dark' : ''
                }`}
                onSubmit={this.onSubmitForm}
              >
                <div className="logo-container">
                  <img
                    src="https://res.cloudinary.com/dazvrkjxg/image/upload/v1702280573/Book%20Hub/rllezn07l030tqakbjjl.svg"
                    alt="login website logo"
                    className="website-logo"
                  />
                  <span className="logo-name">ook Hub</span>
                </div>

                {this.renderUsernameField(isDarkMode)}
                {this.renderPasswordField(isDarkMode)}
                {showingError && <p className="error-msg">{errMsg}</p>}
                <button type="submit" className="login-btn">
                  Login
                </button>
              </form>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
