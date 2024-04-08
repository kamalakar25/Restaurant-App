import {useContext} from 'react'
import CartItem from '../CartItem'

import './index.css'
import RestaurantContext from '../../context/RestaurantContext'

const CartListView = () => {
  const {cartList} = useContext(RestaurantContext)

  return (
    <ul className="cart-list">
      {cartList.map(eachCartItem => (
        <CartItem key={eachCartItem.dishId} cartItemDetails={eachCartItem} />
      ))}
    </ul>
  )
}

export default CartListView