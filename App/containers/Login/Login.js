import React, { Component } from 'react'
import { connect } from 'react-redux';
import { 
  Container,
  Content,
  Form, 
  Item, 
  Input, 
  Text,
  Button 
} from 'native-base';
import { View, StyleSheet, AsyncStorage } from 'react-native'
import HeaderContainer from '../../components/Header';
import validateEmail from '../Validator/Validator';
import FBLoginContainer from '../../containers/Login/FBLoginContainer';
import GoogleSigninContainer from '../../containers/Login/GoogleSigninContainer';
import { login, logout } from '../../redux/actions/loginAction';
import { addItemToCart } from '../../redux/actions/productAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }

  handleSignUp() {
    this.props.history.push("/signup");
  }

  handleLogout() {
    const { logout } = this.props;
    logout()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("nextProps in login", nextProps)
    this.props = nextProps;
  }
  
  _retrieveData = async () => {
    const { email, password } = this.state;
    const { login, addItemToCart, isAddItemToCart, product } = this.props;
    try {
      const userList = JSON.parse(await AsyncStorage.getItem('userList')) || [];
      console.log({userList});
      const isValidUser = userList.filter(user => (user.email === email && user.password === password));
      console.log({isValidUser});
      if (isValidUser.length > 0) {
        // We have data!!
        login(isValidUser[0])
        .then(res => {
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
      } else {
        alert("Email or password is wrong!!")
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  handleLogin() {
    const { email, password } = this.state;
    if(!validateEmail(email)) {
      alert("Email is not valid OR empty!!");
      return;
    }
    if(password === "") {
      alert("Password is empty OR Invalid please check!!");
      return
    }
    this._retrieveData();
  }

  render() {
    console.log('In login props',this.props);
    
    const { isLoggedIn } = this.props;
    return (
      <View style={{height: '100%', width: '100%'}}>
        <Container>
          <HeaderContainer 
            title="Login" 
            {...this.props} 
          />
          <Content padder>
            <Form>
              <Item>
                <Input 
                  placeholder="Email" 
                  onChangeText={(email) => { this.setState({ email });}}
                />
              </Item>
              <Item last>
                <Input 
                  placeholder="Password" 
                  onChangeText={(password) => { this.setState({ password });}}
                  secureTextEntry={true} 
                />
              </Item>
              {!isLoggedIn ?
                <View>
                  <Button 
                    block
                    style={{marginTop: 20}}
                    onPress={this.handleLogin}
                  >
                    <Text> Sign in </Text>
                  </Button>
                  <Button 
                    block 
                    info
                    style={{marginTop: 20}}
                    onPress={this.handleSignUp}
                  >
                    <Text>Sign up</Text>
                  </Button>
                </View> :
                <View>
                  <Button 
                    block 
                    danger
                    style={{marginTop: 20}}
                    onPress={this.handleLogout}
                  >
                    <Text>Logout</Text>
                  </Button> 
                </View>
              }
              { !isLoggedIn &&
                <View>
                  <View style={{paddingTop: 20, flex: 1}}>
                    <GoogleSigninContainer {...this.props}/>
                  </View>
                  <View style={{paddingTop: 20, flex: 1}}>
                    <FBLoginContainer {...this.props} isLoggedIn={isLoggedIn} />
                  </View>
                </View>
              }
            </Form>
          </Content>
        </Container>
      </View>
    );
  }
}

const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)