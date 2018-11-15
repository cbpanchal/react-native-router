import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/actions/loginAction';
import { addItemToCart } from '../../redux/actions/productAction';

class FBLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps', nextProps);
    this.props = nextProps
    return this.props;
  }

  loginHandle(data) {
    console.log('this.props', this.props)
    this.setState({ state: this.state });
    this.forceUpdate();
    const { login,isAddItemToCart, product, addItemToCart  } = this.props;
    login(data)
      .then(res => {
        console.log('hiiii', this.props)
        if(isAddItemToCart) {
          addItemToCart(product, this.props);
          return;
        } else {
          this.props.history.push({
            pathname: '/',
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
      console.log('byeeee')
  }

  render() {
    const { user } = this.state;
    const { login, logout, isAddItemToCart, product, addItemToCart } = this.props;
    return (
      <View style={{width: "100%", height: "100%"}}>
        <FBLogin style={{ marginBottom: 10, }}
          ref={(fbLogin) => { this.fbLogin = fbLogin }}
          permissions={["email","user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={(data) => {
            console.log("Logged in!");
            console.log(data);
            this.setState({
              user: data
            })
            this.loginHandle(data)
            //AsyncStorage.setItem('isLoggedIn', JSON.stringify(true))
            //AsyncStorage.setItem('currentUser', JSON.stringify(data))
          
            //this.setState({ user : data.credentials });
          }}
          onLogout={() => {
            console.log("Logged out.");
            //this.setState({ user : null });
            //AsyncStorage.setItem('isLoggedIn', JSON.stringify(false))
            logout();
          }}
          onLoginFound={(data) => {
            console.log("Existing login found.");
            console.log(data);
            //this.setState({ user : data.credentials });
          }}
          onLoginNotFound={() => {
            console.log("No user logged in.");
            //this.setState({ user : null });
          }}
          onError={(data) => {
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={() => {
            console.log("User cancelled.");
          }}
          onPermissionsMissing={(data) => {
            console.log("Check permissions!");
            console.log(data);
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  isLoggedIn: state.login.isLoggedIn,
  isAddItemToCart: state.products.isAddItemToCart,
  products: state.products.products,
  product: state.products.product,
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  addItemToCart: (product, props) => dispatch(addItemToCart(product, props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FBLoginContainer)
