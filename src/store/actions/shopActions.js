import axios from "axios";

export const SET_PRODUCTS = 'shop/setProducts'
export const ADD_TO_BASKET = 'shop/addToBasket'
export const REMOVE_FROM_BASKET = 'shop/removeFromBasket'
export const INCREMENT_PRODUCT_QUANTITY = 'shop/incrementProductQuantity'
export const DECREMENT_PRODUCT_QUANTITY = 'shop/decrementProductQuantity'
export const OPEN_MODAL ='shop/openModal'
export const CLOSE_MODAL = 'shop/closeModal'

export const fetchProducts = () => (dispatch) => {
    axios.get('https://fakestoreapi.com/products').then((res) => {
        dispatch({
            type: SET_PRODUCTS,
            payload: res.data,
        })
    })
}

export const addToBasket = (product) => (dispatch) => {
    dispatch({
        type: ADD_TO_BASKET,
        payload: product,
    })
}

export const removeFromBasket = (id) => (dispatch) => {
  dispatch({
    type:REMOVE_FROM_BASKET,
    payload: id,
  })
}

export const incrementProduct = (id,count) => (dispatch) => {
  dispatch({
    type:INCREMENT_PRODUCT_QUANTITY,
    payload: id, count,
  })
}

export const decrementProduct = (id, count) => (dispatch) => {
  dispatch({
    type:DECREMENT_PRODUCT_QUANTITY,
    payload: id, count
  })
}