import {Component} from 'react'

import './index.css'

import Header from '../Header'
import SideBar from '../SideBar'

class Bookshelves extends Component {
  render() {
    // const {bookshelvesList} = this.props
    // console.log('Bookshelves Data', bookshelvesList)
    return (
      <div className="bookshelves-page">
        <Header />
        {/* <div className="bottom-part">
          <SideBar bookshelvesList={bookshelvesList} />
        </div> */}
      </div>
    )
  }
}

export default Bookshelves
