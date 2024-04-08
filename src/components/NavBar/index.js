import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {useContext} from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'
import RestaurantContext from '../../context/RestaurantContext'

const NavBar = props => {
  const {cartList, apiResponse} = useContext(RestaurantContext)
  const {data} = apiResponse
  const {restaurantName} = data

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  console.log(cartList)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="link-item">
          <h1 className="web-logo-heading">{restaurantName}</h1>
        </Link>

        <div className="cart-container">
          <p className="my-order-menu">My Orders</p>
          <Link to="/cart" className="link-item">
            <button
              type="button"
              data-testid="cart"
              className="cart-btn cart-icon-container"
            >
              <AiOutlineShoppingCart size={24} className="cart-icon" />
              <p className="cart-orders">{cartList.length}</p>
            </button>
          </Link>

          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(NavBar)