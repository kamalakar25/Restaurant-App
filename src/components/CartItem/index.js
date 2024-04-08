import {useContext} from 'react'

import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'
import RestaurantContext from '../../context/RestaurantContext'

const CartItem = props => {
  const {
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(RestaurantContext)

  const {cartItemDetails} = props
  const {
    dishId,
    dishName,
    dishCalories,
    quantity,
    dishPrice,
    dishImage,
  } = cartItemDetails

  const onClickDecrement = () => {
    decrementCartItemQuantity(dishId)
  }

  const onClickIncrement = () => {
    incrementCartItemQuantity(dishId)
  }
  const onRemoveCartItem = () => {
    removeCartItem(dishId)
  }
  const totalPrice = dishPrice * quantity

  // TODO: Update the functionality to increment and decrement quantity of the cart item

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={dishImage} alt={dishName} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{dishName}</p>
          <p className="cart-product-brand">by {dishCalories}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="minus"
            onClick={onClickDecrement}
          >
            -
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="plus"
            onClick={onClickIncrement}
          >
            +
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {totalPrice}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onRemoveCartItem}
        data-testid="remove"
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem