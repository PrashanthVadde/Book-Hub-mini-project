import './index.css'

const SideBar = props => {
  const {bookshelvesList} = props
  //   const {id, label, value} = bookshelvesList

  return (
    <div className="side-bar">
      <h1 className="side-bar-title">Bookshelves</h1>
      <ul className="side-bar-options">
        {bookshelvesList.map(eachItem => (
          <li key={eachItem.id} value={eachItem.value}>
            <button type="button" className="option-btn">
              {eachItem.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
