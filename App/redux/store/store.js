import { createStore, combineReducers, applyMiddleware } from 'redux';
import loginReducer from '../reducers/loginReducer';
import productReducer from '../reducers/productReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

const rootReducer = combineReducers({
  login: loginReducer,
  products: productReducer
});

const configureStore = () => {
  return createStore(rootReducer, {}, composeWithDevTools(
    applyMiddleware(thunk)
  ));
}

export default configureStore;