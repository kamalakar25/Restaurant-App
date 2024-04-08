import {useState, useContext} from 'react'
import './index.css'
import RestaurantContext from '../../context/RestaurantContext'

const EachMenu = props => {
  const {eachItemDetails} = props
  const {addCartItem} = useContext(RestaurantContext)

  const [quantity, setQuantity] = useState(0)

  const {
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    addOnCat,
  } = eachItemDetails

  const handleMinusSign = () => {
    setQuantity(prevQuantity => (prevQuantity !== 0 ? prevQuantity - 1 : 0))
  }

  const handlePlusSign = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const handleAddCartBtn = () => {
    addCartItem({...eachItemDetails, quantity})
  }

  const dishTypeImg =
    dishType === 1
      ? 'https://img.icons8.com/?size=48&id=61082&format=png'
      : `https://img.icons8.com/?size=48&id=61083&format=png`

  return (
    <li className="eachItem">
      <div className="dish-type-and-dish-details">
        <img src={dishTypeImg} alt={dishName} className="dish-type-img" />
        <div className="dish-details-container">
          <h1 className="dish-name">{dishName}</h1>
          <p className="sar-val">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-desc">{dishDescription}</p>
          {dishAvailability ? (
            <div className="add-on-container">
              <button
                type="button"
                className="add-sub-btn"
                onClick={handleMinusSign}
              >
                -
              </button>
              <p className="number-dish">{quantity}</p>
              <button
                type="button"
                className="add-sub-btn"
                onClick={handlePlusSign}
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available-error">Not available</p>
          )}
          {quantity > 0 && (
            <button
              type="button"
              onClick={handleAddCartBtn}
              className="add-cart-btn"
            >
              ADD TO CART
            </button>
          )}
          {addOnCat.length !== 0 && (
            <p className="custom-avail">Customizations available</p>
          )}
        </div>
      </div>
      <div className="calories-and-image">
        <div className="dish-calories-section">
          <p className="calories">{dishCalories} calories</p>
        </div>
        <div>
          <img src={dishImage} alt={dishId} className="dish-img" />
        </div>
      </div>
    </li>
  )
}

export default EachMenu