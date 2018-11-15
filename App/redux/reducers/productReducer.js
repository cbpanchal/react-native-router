import { 
  SET_PRODUCTS, 
  FETCH_PRODUCTS, 
  ADD_ITEM_TO_CART,
  CLEAR_CART_ITEM,
  SET_TOTAL_AMOUNT 
}  from '../constants/actionConstant'; 

const initialState = {
  products: [],
  isAddItemToCart: false,
  product: {},
  totalAmount: 0
};

const productReducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        isAddItemToCart: true,
        product: action.payload
      }
    case CLEAR_CART_ITEM:
      return {
        ...state,
        isAddItemToCart: false,
        product: {}
      }
    case SET_TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: action.payload
      }
    default:
      return state;
  }
};

export default productReducer;