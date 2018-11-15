import React, {Component} from 'react';
import { View } from "react-native";
import { NativeRouter, Route, AndroidBackButton } from "react-router-native";
import { Drawer } from 'native-base';
import SideBar from './components/SideBar';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Signup from './containers/Login/SignUp';
import AboutUs from './containers/About-us/AboutUs';
import Product from './containers/Product/Product';
import Cart from './containers/Cart/Cart';
import Checkout from './containers/Checkout/Checkout';

export default class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  closeDrawer = () => {
    this._drawer._root.close()
  };
  
  openDrawer = () => {
    console.log("open drawer");
    this._drawer._root.open()
  };

  render() {
    console.log('Index pros',this.props)
    return(
        <NativeRouter>
          <Drawer
            ref={(ref) => this._drawer = ref}
            type="overlay"
            content={<SideBar {...this.props} closeDrawer={this.closeDrawer}  />}
            tapToClose
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={drawerStyles}
            tweenHandler={(ratio) => ({
              main: { opacity:(2-ratio)/1.5}
            })}
          >
          <AndroidBackButton>
            <View>
              <Route exact path="/" component={(props) => 
                <Home {...props} openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} 
                />}
               />
              <Route  path="/aboutus" component={(props) => 
                <AboutUs {...props} openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} 
                />} 
              />
              <Route  path="/login" component={(props) => 
                <Login {...props} openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} 
                  />} 
              />
              <Route  path="/signup" component={(props) => 
                <Signup {...props} openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} 
                  />} 
                />
              <Route  path="/product" component={(props) => 
                <Product {...props} openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} 
                  />}
                />
              <Route  path="/cart" component={(props) => 
                <Cart {...props} openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} 
                  />} 
                />
              <Route  path="/checkout" component={(props) => 
                <Checkout {...props} openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} 
                />}
              />
            </View>
          </AndroidBackButton>
          </Drawer>
        </NativeRouter>
    );
  }
}

const drawerStyles = {
  drawer: { 
    shadowColor: 'black', 
    shadowOpacity: 0.8, 
    shadowRadius: 3
  }
};