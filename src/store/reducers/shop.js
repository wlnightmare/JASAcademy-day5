import {
  ADD_TO_BASKET, 
  REMOVE_FROM_BASKET, 
  SET_PRODUCTS, 
  INCREMENT_PRODUCT_QUANTITY, 
  DECREMENT_PRODUCT_QUANTITY,
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions/shopActions'

const initState = {
    products: [],
    basket: JSON.parse(localStorage.getItem('products')) || [],
    modalOpen: false 
}
console.log(initState)
export function shop(state = initState, action) {
    const newState = {...state}
    switch (action.type) {
        case SET_PRODUCTS:
          newState.products = action.payload;
          break;
        case ADD_TO_BASKET:
          const existedProduct = newState.basket.find(
            (product) => product.product.id === action.payload.id
          );
          if (existedProduct) {
            existedProduct.count++;
            newState.basket = [...newState.basket];
          } else {
            newState.basket = [
              ...newState.basket,
              { product: action.payload, count: 1 },
            ];
          }
          break;
        case REMOVE_FROM_BASKET:
          newState.basket = state.basket.filter((product) => product.product.id !== action.payload)
          break;
        case INCREMENT_PRODUCT_QUANTITY:
          const incrementProduct = newState.basket.find(
            (product) => product.product.id === action.payload)
          incrementProduct.count++
          newState.basket = [...newState.basket] 
          break;
        case DECREMENT_PRODUCT_QUANTITY:
          const decrementProduct = newState.basket.find(
            (product) => product.product.id === action.payload
          )
          decrementProduct.count--
          if (decrementProduct.count === 0){
            newState.basket = state.basket.filter((product) => product.product.id !== decrementProduct.product.id)
          }
          newState.basket =[...newState.basket]          
          break;
          case OPEN_MODAL:
            newState.modalOpen = true;
          break;
          case CLOSE_MODAL:
            newState.modalOpen = false;
          break;
        default:
          return state
    }
    localStorage.setItem('products', JSON.stringify(newState.basket))
    return newState;
}