import React, {Component} from 'react';
import { View } from "react-native";
import { NativeRouter, Route } from "react-router-native";

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Signup from './containers/Login/SignUp';
import AboutUs from './containers/About-us/AboutUs';
import Product from './containers/Product/Product';
import Cart from './containers/Cart/Cart';

export default class AppNavigator extends Component {
  render() {
    return(
      <NativeRouter>
        <View>
          <Route exact path="/" component={Home} />
          <Route  path="/aboutus" component={AboutUs} />
          <Route  path="/login" component={Login} />
          <Route  path="/signup" component={Signup} />
          <Route  path="/product" component={Product} />
          <Route  path="/cart" component={Cart} />
        </View>
      </NativeRouter>
    );
  }
}