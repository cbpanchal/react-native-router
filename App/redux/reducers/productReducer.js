import { 
  SET_PRODUCTS, 
  FETCH_PRODUCTS, 
  ADD_ITEM_TO_CART,
  CLEAR_CART_ITEM 
}  from '../constants/actionConstant'; 

const initialState = {
  products: [],
  isAddItemToCart: false,
  product: {}
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
    default:
      return state;
  }
};

export default productReducer;