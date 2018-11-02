import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

export default class FBLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  onLoginHandle() {
    this.props.onLoginHandle();
  }

  render() {
    const { user } = this.state;
    console.log({user});
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
            AsyncStorage.setItem('isLoggedIn', JSON.stringify(true))
            AsyncStorage.setItem('currentUser', JSON.stringify(data))
            this.props.history.push({
              pathname: '/',
              state: {user: data, isLoggedIn: true}
            });
            //this.setState({ user : data.credentials });
          }}
          onLogout={() => {
            console.log("Logged out.");
            //this.setState({ user : null });
            AsyncStorage.setItem('isLoggedIn', JSON.stringify(false))
            this.onLoginHandle();
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
