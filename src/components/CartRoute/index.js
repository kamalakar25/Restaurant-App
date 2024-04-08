import {useContext} from 'react'
import './index.css'
import NavBar from '../NavBar'
import EmptyCartView from '../EmptyCartView'

import RestaurantContext from '../../context/RestaurantContext'
import CartListView from '../CartListView'

const CartRoute = () => {
  const {cartList, removeAllCartItems} = useContext(RestaurantContext)
  console.log(cartList)

  const onClickRemoveAllBtn = () => removeAllCartItems()

  return (
    <>
      <NavBar />
      <div className="cart-container">
        {cartList.length === 0 ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <button
              type="button"
              className="remove-all-btn"
              onClick={onClickRemoveAllBtn}
            >
              Remove All
            </button>
            <CartListView />

            {/* <CartSummary /> */}
          </div>
        )}
      </div>
    </>
  )
}

export default CartRoute