import _ from 'lodash';
import React, { Component } from 'react'
import { 
  Container, 
  Content, 
  Form, 
  Item, 
  Input,
  Button,
  Text 
} from 'native-base';
import { View, AsyncStorage } from 'react-native'
import HeaderContainer from '../../components/Header';
import validateEmail from '../Validator/Validator';
import FBLoginContainer from '../../containers/Login/FBLoginContainer';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      isValidUser: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this._storeData = this._storeData.bind(this);
  }

  handleLogin() {
    this.props.history.push("/login");
  }

  handleRegister() {
    console.log(this.state);
    const { email, password, confirmPassword } = this.state;
    const user = {
      userId: new Date().getTime(),
      email,
      password,
      confirmPassword
    }
    if(!validateEmail(email)) {
      alert("Email is not valid OR empty!!");
      return;
    }
    if(password === "" && confirmPassword === "") {
      alert("Password and Confirm Password should not empty!!");
      return;
    }
    if(password === confirmPassword) {
      this.setState({ isValidUser: true })
      this._storeData(user);
    } else {
      alert("Password does not match!!")
    }
  }

  _storeData = async (user) => {
      const userList = JSON.parse(await AsyncStorage.getItem('userList')) || [];
      const exitsUserIndex = _.findIndex(userList, ['email', user.email]);
      //const exitsUserIndex = userList.findIndex(user);
      console.log(exitsUserIndex);
      if(exitsUserIndex !== -1){
        alert("User is already exist!!")
        return false;
      }
      userList.push(user);
      await AsyncStorage.setItem('userList', JSON.stringify(userList))
        .then(res => {
          this.props.history.push("/login");
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
  }

  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <Container>
          <HeaderContainer title="SignUp" {...this.props}/>
          <Content padder>
            <Form>
              <Item>
                <Input 
                  placeholder="Email"
                  onChangeText={(email) => { this.setState({ email });}}
                />
              </Item>
              <Item>
                <Input 
                  placeholder="Password"
                  onChangeText={(password) => { this.setState({ password });}}
                  secureTextEntry={true} 
                />
              </Item>
              <Item last>
                <Input 
                  placeholder="Confirm Password" 
                  onChangeText={(confirmPassword) => { this.setState({ confirmPassword });}}
                  secureTextEntry={true}  
                />
              </Item>
              <Button 
                block
                style={{marginTop: 20}}
                onPress={this.handleRegister}
              >
                <Text> Sign Up </Text>
              </Button>
              <Button 
                block 
                info
                style={{marginTop: 20}}
                onPress={this.handleLogin}
              >
                <Text>Login</Text>
              </Button>
              <View style={{paddingTop: 20}}>
                <FBLoginContainer {...this.props}/>
              </View>
            </Form>
          </Content>
        </Container>
      </View>
    )
  }
}