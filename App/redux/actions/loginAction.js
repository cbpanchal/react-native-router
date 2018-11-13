import { LOGIN } from '../constants/actionConstant';
import { LOGOUT } from '../constants/actionConstant';

export const login = (user) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOGIN,
      payload: user
    });
    resolve(true);
  });
};

export const logout = () => {
  return {
    type: LOGOUT
  }
};