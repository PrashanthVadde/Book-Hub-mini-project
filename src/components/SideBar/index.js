import './index.css'

const SideBar = props => {
  const {bookshelvesList} = props
  //   const {id, label, value} = bookshelvesList

  return (
    <ul className="side-bar">
      {bookshelvesList.map(eachItem => (
        <li key={eachItem.id} value={eachItem.value}>
          {eachItem.label}
        </li>
      ))}
    </ul>
  )
}

export default SideBar
