import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
// import Popup from 'reactjs-popup'
// import {RiMenuFoldLine, RiMoonClearFill} from 'react-icons/ri'
// import {IoIosCloseCircle} from 'react-icons/io'
// import {IoSunny} from 'react-icons/io5'

import ThemeContext from '../Context/ThemeContext'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {activeTab, onUpdateActiveTab, isDarkMode, onToggleTheme} = value

      const onClickLogo = () => {
        onUpdateActiveTab('home')
      }

      const onClickHomeTab = () => {
        onUpdateActiveTab('home')
      }

      const onClickBookshelvesTab = () => {
        onUpdateActiveTab('bookshelves')
      }

      const onClickThemeBtn = () => {
        onToggleTheme()
      }

      const themeBtnStyles = {
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        backgroundColor: 'transparent',
      }

      const onClickLogoutBtn = () => {
        const {history} = props
        history.replace('/login')
        Cookies.remove('jwt_token')
      }

      const homeTabLightColor = activeTab === 'home' ? '#0284c7' : '#64748b'
      const homeTabDarkColor = activeTab === 'home' ? '#0284c7' : '#e4e7eb'
      const bookshelvesTabLightColor =
        activeTab === 'bookshelves' ? '#0284c7' : '#64748b'
      const bookshelvesTabDarkColor =
        activeTab === 'bookshelves' ? '#0284c7' : '#e4e7eb'

      return (
        <div
          className="header-container"
          style={{
            backgroundColor: isDarkMode ? '#18122B' : '#fff',
            borderColor: isDarkMode ? '#040D12' : '',
          }}
        >
          <Link to="/" style={{textDecoration: 'none'}}>
            <button
              className="logo-container"
              type="button"
              onClick={onClickLogo}
            >
              <img
                src="https://res.cloudinary.com/dazvrkjxg/image/upload/v1702280573/Book%20Hub/rllezn07l030tqakbjjl.svg"
                alt="login website logo"
                className="web-logo"
              />
              <span className="logo-text">ook Hub</span>
            </button>
          </Link>

          <ul className="buttons-container">
            <Link to="/" style={{textDecoration: 'none'}}>
              <li>
                <button
                  type="button"
                  onClick={onClickHomeTab}
                  className="header-home"
                  style={{
                    color: isDarkMode ? homeTabDarkColor : homeTabLightColor,
                  }}
                >
                  Home
                </button>
              </li>
            </Link>

            <Link to="/shelf" style={{textDecoration: 'none'}}>
              <li>
                <button
                  type="button"
                  onClick={onClickBookshelvesTab}
                  className="header-bookshelves"
                  style={{
                    color: isDarkMode
                      ? bookshelvesTabDarkColor
                      : bookshelvesTabLightColor,
                  }}
                >
                  Bookshelves
                </button>
              </li>
            </Link>

            {/* {isDarkMode ? (
                <button
                  type="button"
                  style={{...themeBtnStyles}}
                  onClick={onClickThemeBtn}
                >
                  <IoSunny size={30} style={{color: '#DDE6ED'}} />
                </button>
              ) : (
                <button
                  type="button"
                  style={{
                    ...themeBtnStyles,
                  }}
                  onClick={onClickThemeBtn}
                >
                  <RiMoonClearFill size={30} style={{color: '#03001C'}} />
                </button>
              )} */}
            <button
              type="button"
              onClick={onClickLogoutBtn}
              className="logout-btn"
            >
              Logout
            </button>
          </ul>

          {/* <div className="popup-container">
              {isDarkMode ? (
                <button
                  type="button"
                  style={{
                    ...themeBtnStyles,
                  }}
                  onClick={onClickThemeBtn}
                >
                  <IoSunny size={30} style={{color: '#DDE6ED'}} />
                </button>
              ) : (
                <button
                  type="button"
                  style={{
                    ...themeBtnStyles,
                  }}
                  onClick={onClickThemeBtn}
                >
                  <RiMoonClearFill
                    size={30}
                    style={{color: isDarkMode ? '#DDE6ED' : '#03001C'}}
                  />
                </button>
              )}
              <Popup
                trigger={
                  <button type="button" className="menu-button">
                    <RiMenuFoldLine
                      size={30}
                      style={{
                        color: isDarkMode ? '#DDE6ED' : '#03001C',
                        marginLeft: 20,
                      }}
                    />
                  </button>
                }
                position="bottom right"
              >
                {close => (
                  <div
                    className="popup-content-container"
                    style={{
                      backgroundColor: isDarkMode ? '#2C3639' : '#e4e7eb',
                      border: '2px solid #00005C',
                      borderRadius: '6px',
                    }}
                  >
                    <Link to="/" style={{textDecoration: 'none'}}>
                      <button
                        type="button"
                        className="popup-btn"
                        onClick={onClickHomeTab}
                      >
                        <p
                          style={{
                            color: isDarkMode
                              ? homeTabDarkColor
                              : homeTabLightColor,
                          }}
                        >
                          Home
                        </p>
                      </button>
                    </Link>

                    <Link to="/shelf" style={{textDecoration: 'none'}}>
                      <button
                        type="button"
                        className="popup-btn"
                        onClick={onClickBookshelvesTab}
                      >
                        <p
                          style={{
                            color: isDarkMode
                              ? bookshelvesTabDarkColor
                              : bookshelvesTabLightColor,
                          }}
                        >
                          Bookshelves
                        </p>
                      </button>
                    </Link>

                    <button
                      type="button"
                      onClick={onClickLogoutBtn}
                      className="logout-btn"
                    >
                      Logout
                    </button>

                    <button
                      type="button"
                      className="close-button"
                      onClick={() => close()}
                    >
                      <IoIosCloseCircle
                        size={25}
                        style={{color: isDarkMode ? '#DDE6ED' : '#03001C'}}
                      />
                    </button>
                  </div>
                )}
              </Popup>
            </div> */}
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
