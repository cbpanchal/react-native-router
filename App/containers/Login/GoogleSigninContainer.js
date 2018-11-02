import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

GoogleSignin.configure();

export default class GoogleSigninContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    }
  }

  signIn = async () => {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn()
      .then(res => {
        console.log({res})
        this.setState({ userInfo: res });
      })
      .catch(error => {
        console.log({error})
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          console.log("user cancelled the login flow");
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
          console.log("operation (f.e. sign in) is in progress already")
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          console.log("play services not available or outdated")
        } else {
          // some other error happened
          console.log("Something else")
        }
      })
  };

  render() {
    const { userInfo } = this.state;
    console.log({userInfo})
    return (
      <View style={{width: "100%", height: "100%"}}>
        <GoogleSigninButton
          style={{ width: "100%", height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
        />
      </View>
    )
  }
}