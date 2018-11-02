import React, { Component } from 'react'
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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      badgeCount: 0,
      passLogin: false
    }
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
    this.onLoginHandle = this.onLoginHandle.bind(this);
  }

  componentDidMount = async () => {
    const products = JSON.parse(await AsyncStorage.getItem('products')) || [];
    this.setState({
      badgeCount: products.length
    })
  }

  handleSignUp() {
    this.props.history.push("/signup");
  }

  _retrieveData = async () => {
    const { email, password } = this.state;
    const userList = JSON.parse(await AsyncStorage.getItem('userList')) || [];
    console.log({userList});
    const isValidUser = userList.filter(user => (user.email === email && user.password === password));
    console.log({isValidUser});
      if (isValidUser.length > 0) {
        // We have data!!
        this.props.history.push("/");
        console.log(user);
      } else {
        alert("Email or password is wrong!!")
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

  onLoginHandle() { 
    this.setState({
      passLogin: true
    })
  }

  render() {
    const { badgeCount, passLogin } = this.state;
    return (
      <View style={{height: '100%', width: '100%'}}>
        <Container>
          <HeaderContainer 
            title="Login" 
            {...this.props} 
            badgeCount={badgeCount} 
            passLogin={passLogin}
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
              <View style={{paddingTop: 20, flex: 1}}>
                <GoogleSigninContainer {...this.props}/>
              </View>
              <View style={{paddingTop: 20, flex: 1}}>
                <FBLoginContainer {...this.props} onLoginHandle={this.onLoginHandle}/>
              </View>
            </Form>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {

  }
});
