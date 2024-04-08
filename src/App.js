import {Switch, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import RestaurantContext from './context/RestaurantContext'
import CartRoute from './components/CartRoute'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// write your code here
const App = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstant.initial,
    data: null,
    errorMsg: null,
  })

  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => {
    setCartList([])
  }

  const removeCartItem = dishId => {
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.dishId !== dishId,
    )

    setCartList(updatedCartList)
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(prevCartList =>
      prevCartList.map(eachCartItem => {
        if (dishId === eachCartItem.dishId) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    )
  }

  const decrementCartItemQuantity = dishId => {
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishId === dishId,
    )
    if (productObject.quantity > 1) {
      setCartList(prevCartList =>
        prevCartList.map(eachCartItem => {
          if (dishId === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      )
    } else {
      removeCartItem(dishId)
    }
  }

  //   //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  const addCartItem = product => {
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishId === product.dishId,
    )

    if (productObject) {
      setCartList(prevCartList =>
        prevCartList.map(eachCartItem => {
          if (productObject.dishId === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.quantity + product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      )
    } else {
      setCartList(prevCartList => [...prevCartList, product])
    }
  }

  useEffect(() => {
    const getApiResponse = async () => {
      setApiResponse(prevApiResponse => ({
        ...prevApiResponse,
        status: apiStatusConstant.inProgress,
      }))

      const url = `https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc`
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const responseData = await response.json()
      console.log(responseData)

      if (response.ok) {
        const updatedData = {
          restaurantName: responseData[0].restaurant_name,
          formattedData: responseData[0].table_menu_list.map(eachItem => ({
            menuCategory: eachItem.menu_category,
            menuCategoryId: eachItem.menu_category_id,
            categoryDishes: eachItem.category_dishes.map(eachDish => ({
              dishId: eachDish.dish_id,
              dishName: eachDish.dish_name,
              dishPrice: eachDish.dish_price,
              dishImage: eachDish.dish_image,
              dishCurrency: eachDish.dish_currency,
              dishCalories: eachDish.dish_calories,
              dishDescription: eachDish.dish_description,
              dishAvailability: eachDish.dish_Availability,
              dishType: eachDish.dish_Type,
              addOnCat: eachDish.addonCat,
            })),
          })),
        }
        console.log(updatedData)
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          data: updatedData,
          status: apiStatusConstant.success,
        }))
      } else {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          status: apiStatusConstant.failure,
          errorMsg: responseData.errorMsg,
        }))
      }
    }

    getApiResponse()
  }, [])

  const renderSuccessView = () => (
    <>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/cart" component={CartRoute} />
    </>
  )

  const renderFailureView = () => {
    const {errorMsg} = apiResponse
    return <div className="failure-view">{errorMsg}</div>
  }
  const renderLoadingView = () => (
    <div className="loader-view">
      <Loader color="#000000" size={50} />
    </div>
  )

  const renderMenuListContainer = () => {
    const {status} = apiResponse

    switch (status) {
      case apiStatusConstant.success:
        return renderSuccessView()
      case apiStatusConstant.failure:
        return renderFailureView()
      case apiStatusConstant.inProgress:
        return renderLoadingView()

      default:
        return null
    }
  }

  return (
    <RestaurantContext.Provider
      value={{
        apiResponse,
        cartList,
        addCartItem,
        removeCartItem,
        decrementCartItemQuantity,
        removeAllCartItems,
        incrementCartItemQuantity,
      }}
    >
      <div className="page-container">
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          {renderMenuListContainer()}
        </Switch>
      </div>
    </RestaurantContext.Provider>
  )
}

export default App 