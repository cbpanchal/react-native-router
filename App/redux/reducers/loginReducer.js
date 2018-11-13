import { LOGIN }  from '../constants/actionConstant'; 
import { LOGOUT }  from '../constants/actionConstant'; 

const initialState = {
  user: {},
  isLoggedIn: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      };
    case LOGOUT: 
      return {
        user: {},
        isLoggedIn: false
      };  
    default:
      return state;
  }
}

export default loginReducer;