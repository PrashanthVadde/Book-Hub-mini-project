import './index.css'
import ThemeContext from '../../Context/ThemeContext'

const SideBar = props => {
  const {bookshelvesList, onClickTab, activeId} = props

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value

        return (
          <div
            className="side-bar"
            style={{backgroundColor: isDarkMode ? '#18122B' : '#fff'}}
          >
            <h1
              className="side-bar-title"
              style={{color: isDarkMode ? '#DDE6ED' : '#1e293b'}}
            >
              Bookshelves
            </h1>
            <ul className="side-bar-options">
              {bookshelvesList.map(eachItem => {
                const onClickOption = () => {
                  onClickTab(eachItem.id, eachItem.value)
                }

                const labelLightTextStyles =
                  activeId === eachItem.id ? '#0284c7' : '#334155'
                const labelDarkTextStyles =
                  activeId === eachItem.id ? '#0284c7' : '#F4EEE0'

                const classNameForActiveTab =
                  activeId === eachItem.id && 'active-tab-styles'
                return (
                  <li key={eachItem.id}>
                    <button
                      type="button"
                      className={`option-btn ${classNameForActiveTab}`}
                      onClick={onClickOption}
                      style={{
                        color: isDarkMode
                          ? labelDarkTextStyles
                          : labelLightTextStyles,
                      }}
                    >
                      {eachItem.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SideBar
