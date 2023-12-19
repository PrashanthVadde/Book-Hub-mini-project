import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'
import ThemeContext from '../Context/ThemeContext'

const Footer = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMode} = value

      return (
        <div className="contact-form">
          <div className="icons-container">
            <FaGoogle
              size={22}
              style={{color: isDarkMode ? '#B9B4C7' : 'black'}}
            />
            <FaTwitter
              size={22}
              style={{color: isDarkMode ? '#B9B4C7' : 'black'}}
            />
            <FaInstagram
              size={22}
              style={{color: isDarkMode ? '#B9B4C7' : 'black'}}
            />
            <FaYoutube
              size={22}
              style={{color: isDarkMode ? '#B9B4C7' : 'black'}}
            />
          </div>
          <p
            className="contact-us"
            style={{color: isDarkMode ? '#F4EEE0' : 'black'}}
          >
            Contact Us
          </p>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Footer
