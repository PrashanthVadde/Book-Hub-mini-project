import {Link} from 'react-router-dom'

import './index.css'
import ThemeContext from '../../Context/ThemeContext'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMode} = value

      return (
        <div
          className="not-found-page"
          style={{backgroundColor: isDarkMode ? '#0F0F0F' : '#f5f7fa'}}
        >
          <img
            src="https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1900.jpg?w=740&t=st=1702413521~exp=1702414121~hmac=f84e708e1e16b4263001036f8c52c1dce27bde33b36981017a6bc17b1f97bee1"
            alt="not found"
            className="not-found-img"
          />
          <h1
            className="not-found-page-title"
            style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
          >
            Page Not Found
          </h1>
          <p
            className="description"
            style={{color: isDarkMode ? '#9DB2BF' : '#475569'}}
          >
            we are sorry, the page you requested could not be found, Please go
            back to the homepage.
          </p>
          <Link to="/" style={{textDecoration: 'none'}}>
            <button type="button" className="go-back-to-home-btn">
              Go Back to Home
            </button>
          </Link>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
