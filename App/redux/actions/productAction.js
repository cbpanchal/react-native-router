import { AsyncStorage, ToastAndroid, Alert } from 'react-native';
import _ from 'lodash';

import { 
  SET_PRODUCTS,
  FETCH_PRODUCTS, 
  ADD_ITEM_TO_CART,
  CLEAR_CART_ITEM 
} from '../constants/actionConstant';

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products
  }
};

export const fetchProducts =  () => dispatch => {
  AsyncStorage.getItem('products')
    .then(res => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: JSON.parse(res) || [],
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: [],
      });
      console.log(err)
    }); 
};

// export const fetchProducts =  async () => {
//   const products = JSON.parse(await AsyncStorage.getItem('products') || [])
//   console.log(products, "fetchProducts");
//   return {
//     type: FETCH_PRODUCTS,
//     payload: products
//   }
// };

export const handleIsLoginOrNot = (props) => {
  Alert.alert(
    'Login',
    `Please login for add item to the cart`,
    [
      {text: 'Cancel', onPress: () => { return false; }, style: 'cancel'},
      {text: 'LOGIN', onPress: () => props.history.push('/login')},
    ],
  )    
}

export const addItemToCart = (product, props) => dispatch => {
  //const products = JSON.parse(await AsyncStorage.getItem('products')) || [];
  const { products, isLoggedIn } = props;
  console.log("In addItemToCart isLoggedIn>>>>", props);
  if(!isLoggedIn) {
    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: product,
    });
    handleIsLoginOrNot(props);
    return;
  }
  const existingProduct = _.findIndex(products, ['name', product.name]);
  console.log({existingProduct});
  if(existingProduct !== -1) {
    const productIdx = products.map(value => value.name).indexOf(product.name);
    console.log("productIdx........", productIdx);
    products[productIdx].quantity++;
    console.log("product........", products);
    ToastAndroid.show(`Added ${products[productIdx].quantity} ${product.name} to the Cart!`, ToastAndroid.SHORT);
    setProducts(products);
    AsyncStorage.setItem('products', JSON.stringify(products))
    .then(res => {
      console.log("Successfully merged product....")
    })
    .catch(error => {
      console.log(error);
    })
    dispatch({
      type: CLEAR_CART_ITEM,
    });
    props.history.push({
      pathname: '/product',
      state: {name: product.name}
    })
    return false;
  } else {
      ToastAndroid.show(`Added ${product.name} to the Cart!`, ToastAndroid.SHORT);
  }
  products.push(product);
  setProducts(products);
  AsyncStorage.setItem('products', JSON.stringify(products))
  .then(res => {
    console.log("Successfully added item to cart..")
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  });
  dispatch({
    type: CLEAR_CART_ITEM,
  });
  props.history.push({
    pathname: '/product',
    state: {name: product.name}
  })
}

