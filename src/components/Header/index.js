import './index.css'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

const Header = () => {
  const onClickLogoutBtn = props => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dazvrkjxg/image/upload/v1702280573/Book%20Hub/rllezn07l030tqakbjjl.svg"
          alt="login website logo"
          className="web-logo"
        />
        <span className="logo-text">ook Hub</span>
      </div>

      <div className="buttons-container">
        <h1 className="header-home">Home</h1>
        <h1 className="header-bookshelves">Bookshelves</h1>
        <button type="button" onClick={onClickLogoutBtn} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
